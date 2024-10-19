// src/components/Card.jsx
import React from 'react';
import './Card.css'; // Optional for styling

const Card = ({ questionData, onAnswerSelected }) => {
  return (
    <div className="card">
      <h2>{questionData.text}</h2>
      {/* Render answers based on question type */}
      {questionData.type === 'yesNo' && (
        <div>
          <button onClick={() => onAnswerSelected(questionData.id, 'yes')}>Yes</button>
          <button onClick={() => onAnswerSelected(questionData.id, 'no')}>No</button>
        </div>
      )}
      {questionData.type === 'scale' && (
        <div>
          {[...Array(questionData.scaleMax)].map((_, index) => (
            <button key={index} onClick={() => onAnswerSelected(questionData.id, index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
