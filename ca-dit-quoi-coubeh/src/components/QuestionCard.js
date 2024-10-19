import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer Bootstrap

function QuestionCard({ 
  questionData, 
  onNext, 
  onPrev, 
  currentQuestion, 
  totalQuestions 
}) {
  const { text, type, options, scaleMax } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <motion.div
      className="question-card-container p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center" style={{ color: '#FFF' }}>{text}</h2>

      <div className="d-flex flex-column gap-2">
        {type === 'multiple_choice' && options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option.label)}
            className={`btn btn-primary ${selectedAnswer === option.label ? 'active' : ''}`}
          >
            {option.emoji} {option.label}
          </button>
        ))}

        {type === 'scale' && (
          <div className="d-flex justify-content-between">
            {[...Array(scaleMax)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index + 1)}
                className={`btn btn-secondary ${selectedAnswer === index + 1 ? 'active' : ''} flex-fill`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{justifyContent: 'center'}}>
        <button className="btn btn-danger">🗑️</button>
        <button className="btn btn-info">ℹ</button>
        <button className="btn btn-success voice-button">🎤</button>
      </div>
    </motion.div>
  );
}

export default QuestionCard;
