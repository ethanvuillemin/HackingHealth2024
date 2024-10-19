import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Question.css';

function Question({ 
  questionData, 
  onNext, 
  onPrev, 
  currentQuestion, // Receive currentQuestion
  totalQuestions   // Receive totalQuestions
}) {
  const { text, type, scaleMax } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    // Here you can handle saving the answer 
    // (e.g., to an array or sending to a database)
  };

  return (
    <motion.div
      className="question-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{text}</h2>

      <div className="answer-options">
        {type === 'yesNo' && (
          <div className="yes-no-options">
            <button onClick={() => handleAnswerSelect('yes')}>Yes</button>
            <button onClick={() => handleAnswerSelect('no')}>No</button>
          </div>
        )}

        {type === 'scale' && (
          <div className="scale-options">
            {[...Array(scaleMax)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button className="trash-button">🗑️</button>
        <button className="info-button">ℹ️</button>
        <button className="voice-button">🎤</button>
      </div>

      <div className="navigation-buttons">
      {currentQuestion > 0 && ( 
        <button onClick={onPrev} className="prev-button">
          Previous
        </button>
      )}
      {currentQuestion < totalQuestions - 1 && ( // Use totalQuestions here
        <button onClick={onNext} className="next-button">
          Next
        </button>
      )}
    </div>
    </motion.div>
  );
}

export default Question;