import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import React-Slick
import Question from '../components/Question';
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css'; // Import QuizPage-specific CSS
import logo from "../assets/logo.png";
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
      <div style={{marginBottom: '5rem'}} >
        <img src={logo} alt="Logo" className="app-logo" style={{ maxWidth: "100vw" }} />
      </div>

      <div style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
        <ProgressBar progress={(currentQuestion / questions.length) * 100} />
      </div>

    <div style={{paddingLeft: '1rem', paddingRight: '1rem'}} >
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

    </div>




    </div>
  );
}

export default QuizPage;
