import React, { useState } from 'react';
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

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) =>
      prevQuestion < questions.length - 1 ? prevQuestion + 1 : prevQuestion
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prevQuestion) =>
      prevQuestion > 0 ? prevQuestion - 1 : prevQuestion
    );
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
      
      <Swiper
        spaceBetween={50}
        slidesPerView={1}  // Adjust slidesPerView to show one question per slide
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {questions.map((question) => (
          <SwiperSlide key={question.id}>
            <Question
              questionData={question}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onAnswerSelected={(answer) => 
                handleAnswerSelected(question.id, answer)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default QuizPage;
