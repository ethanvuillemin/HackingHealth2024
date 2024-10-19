import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Question from '../components/Question';
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css'; // Import QuizPage-specific CSS

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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Determine if mobile

  useEffect(() => {
    // Update isMobile when window resizes
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerSelected = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div className="quiz-container">
      <ProgressBar progress={(currentQuestion / questions.length) * 100} />

      {isMobile ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}  // Show one question at a time
          onSlideChange={(swiper) => setCurrentQuestion(swiper.activeIndex)} // Update question index on slide change
        >
          {questions.map((question) => (
            <SwiperSlide key={question.id}>
              <Question
                questionData={question}
                onAnswerSelected={(answer) =>
                  handleAnswerSelected(question.id, answer)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="desktop-quiz">
          <Question
            questionData={questions[currentQuestion]}
            onAnswerSelected={(answer) =>
              handleAnswerSelected(questions[currentQuestion].id, answer)
            }
          />
          <div className="button-container">
            <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
