

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
    id: 1,
    text: "T’as trouvé l’accueil comment en arrivant ?",
    type: "multiple_choice",
    options: [
      { emoji: "🏆", label: "Super top, tapis rouge !" },
      { emoji: "😊", label: "Sympa, rien à dire" },
      { emoji: "😐", label: "Bof, pas ouf" },
      { emoji: "🙁", label: "À éviter la prochaine fois..." },
    ],
  },
  {
    id: 2,
    text: "Tu sais qui s’occupe de toi (genre les médecins, les infirmiers) ?",
    type: "multiple_choice",
    options: [
      { emoji: "🕵️", label: "J’ai repéré tout le monde, c’est clair !" },
      { emoji: "😊", label: "Oui, je pense avoir capté" },
      { emoji: "😐", label: "Ça se mélange un peu…" },
      { emoji: "🙁", label: "C’est qui eux, déjà ?" },
    ],
  },
  {
    id: 3,
    text: "Le livret d’accueil, il t’a servi à quelque chose ?",
    emoji : ["👎",  "👍"],
    type: "scale",
  },{
  id: 4,
  text: "Merci D'avoir repondu !",
  emoji : ["👎",  "👍"],
  type: "",
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
