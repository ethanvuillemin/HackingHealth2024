

// src/pages/Acceuil.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import React-Slick
import QuestionCard from '../../components/QuestionCard'; // Ensure you import the new component
import '../QuizPage.css'; // Import Acceuil-specific CSS
import logo from "../../assets/logo.png";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample questions array
const questions = [
  {
    id: 10,
    text: "T’as capté les soins et les traitements qu’on te donne ?",
    type: "multiple_choice",
    options: [
      { emoji: "🧑‍🔬", label: "Oui, je pourrais devenir docteur !" },
      { emoji: "😊", label: "J’ai pigé l’essentiel" },
      { emoji: "😐", label: "Ça reste flou parfois" },
      { emoji: "🙁", label: "Non, je suis perdu(e)" },
    ],
  },
  {
    id: 11,
    text: "Tu te sens respecté(e) dans ton intimité ici (chambre, espace personnel, corps) ?",
    type: "multiple_choice",
    options: [
      { emoji: "🛡️", label: "Oui, tout à fait !" },
      { emoji: "😊", label: "Oui, la plupart du temps" },
      { emoji: "😐", label: "Ça dépend des moments" },
      { emoji: "🙁", label: "Non, pas trop…" },
    ],
  },
  {
    id: 12,
    text: "Tu trouves que l’équipe te traite avec respect ?",
    type: "multiple_choice",
    options: [
      { emoji: "✌️", label: "Oui, je me sens respecté(e)" },
      { emoji: "😊", label: "La plupart du temps" },
      { emoji: "😐", label: "Ça dépend…" },
      { emoji: "🙁", label: "Pas trop, non" },
    ],
  },
];


function Acceuil() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Determine if mobile

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnswerSelected = (questionId, answer) => {
    console.log(`Question ID: ${questionId}, Answer: ${answer}`);
  };

  // Settings for React-Slick
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentQuestion(current),
  };

  return (
    <div className="quiz-container">
      <div style={{ marginTop: '-10rem' }}>
        <a href='/' >
        <img src={logo} alt="Logo" className="app-logo" style={{ maxWidth: "100vw" }} />
        </a>
        
      </div>

      {/* <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <ProgressBar progress={(currentQuestion / questions.length) * 100} />
      </div> */}

      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Slider {...settings}>
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <QuestionCard
                questionData={question}
                onAnswerSelected={handleAnswerSelected}
                onNext={() => setCurrentQuestion((prev) => prev + 1)}
                onPrev={() => setCurrentQuestion((prev) => prev - 1)}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                emoji={question.emoji}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Acceuil;
