import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap
import { motion, AnimatePresence } from "framer-motion";

function QuestionCard({ 
  questionData, 
  onNext, 
  onPrev, 
  currentQuestion, 
  totalQuestions 
}) {
  const { text, type, options, scaleMax, emoji } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explosions, setExplosions] = useState([]);
  const emojiList = ["🎉", "🥳", "🎊", "✨", "🤩", "🔥", "🚀", "💯", "💖", "🎈", "🎁", "😄"]; 

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleButtonClick = (e) => {
    const buttonRect = e.target.getBoundingClientRect();
    const explosionCount = Math.random() * 20 + 20; // Increased number of emojis

    setExplosions((prevExplosions) => [
      ...prevExplosions,
      ...Array.from({ length: explosionCount }, (_, i) => ({
        id: Date.now() + i,
        x:  window.outerWidth / 2 - buttonRect.x, // Random X within button width
        y: 0, // Start at the bottom edge
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      })),
    ]);
  };


  const handleButtonClickSlider = (e) => {
    const buttonRect = e.target.getBoundingClientRect();
    const explosionCount = 5; // Increased number of emojis

    setExplosions((prevExplosions) => [
      ...prevExplosions,
      ...Array.from({ length: explosionCount }, (_, i) => ({
        id: Date.now() + i,
        x:  window.outerWidth / 2 - buttonRect.x, // Random X within button width
        y: 0, // Start at the bottom edge
        emoji: emoji[Math.floor(Math.random() * emojiList.length)],
      })),
    ]);
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
            onClick={(e) => {
              handleAnswerSelect(option.label);
              handleButtonClick(e);
            }}
            className={`btn btn-primary ${selectedAnswer === option.label ? 'active' : ''}`}
          >
            {option.emoji} {option.label}
          </button>
        ))}

        {type === 'scale' && (
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
              <span>{emoji[0]}</span> {/* Emoji pour 0 à gauche */}
              <span>{emoji[1]}</span> {/* Emoji pour 1 à droite */}
            </div>
            <input
              type="range"
              min={0} // Remplacez par 0 si c'est la valeur minimale
              max={7} // Remplacez par 1 si c'est la valeur maximale
              value={selectedAnswer || 0} // Valeur par défaut
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                handleAnswerSelect(value);
                handleButtonClickSlider(e); // Call the button click function
              }}
              className="form-range"
              style={{ width: '100%' }} // Adjust the width of the slider
            />
            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
              {[...Array(scaleMax)].map((_, index) => (
                <span key={index} style={{ width: `${100 / scaleMax}%`, textAlign: 'center' }}>
                  
                </span>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {explosions.map((explosion) => (
            <motion.span
              key={explosion.id}
              initial={{ opacity: 1, x: explosion.x, y: explosion.y, scale: 0 }}
              animate={{
                opacity: 0,
                x: [explosion.x - (Math.random() - 0.5) * 300, explosion.x + (Math.random() - 0.5) * 600],
                y: [explosion.y, explosion.y - 150 + (Math.random() - 0.5) * 500],
                scale: [1, 2, 0],
                rotate: (Math.random() - 0.5) * 360,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ position: "absolute", fontSize: 24 }}
            >
              {explosion.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <button className="btn btn-danger" style={{ borderRadius: '50px' }}>🗑️</button>
        <button className="btn btn-info">ℹ</button>
        <button className="btn btn-success voice-button">🎤</button>
      </div>
    </motion.div>
  );
}

export default QuestionCard;
