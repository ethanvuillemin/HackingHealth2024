import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import React-Slick
import Question from '../components/Question';
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css'; // Import QuizPage-specific CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample questions array
const questions = [
  { id: 1, text: 'Did you enjoy your stay?', type: 'yesNo' },
  {
    id: 2,
    text: 'How would you rate the food? (1 being the worst)',
    type: 'scale',
    scaleMax: 6,
  },
  // ... more questions
];

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Determine if mobile

  useEffect(() => {
    // Update isMobile when window resizes
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnswerSelected = (questionId, answer) => {
    // Implement your answer selection logic if needed
  };

  // Settings for React-Slick
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentQuestion(current), // Update question index on slide change
  };

  return (
    <div className="quiz-container">
      <ProgressBar progress={(currentQuestion / questions.length) * 100} />

      <Slider {...settings}>
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <Question
              questionData={question}
              onAnswerSelected={(answer) =>
                handleAnswerSelected(question.id, answer)
              }
            />
          </div>
        ))}
      </Slider>

      {/* Navigation buttons for desktop view */}
      {!isMobile && (
        <div className="button-container">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
