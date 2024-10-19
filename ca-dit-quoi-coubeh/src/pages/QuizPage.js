// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import React-Slick
import QuestionCard from '../components/QuestionCard'; // Ensure you import the new component
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css'; // Import QuizPage-specific CSS
import logo from "../assets/logo.png";
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
    type: "multiple_choice",
    options: [
      { emoji: "📚", label: "Trop utile, je l’ai lu direct !" },
      { emoji: "😊", label: "Ouais, j’ai regardé vite fait" },
      { emoji: "😐", label: "Ça m’a pas trop aidé" },
      { emoji: "🙁", label: "Quel livret ?" },
    ],
  },
  {
    id: 4,
    text: "Ta chambre, c’est comment ?",
    type: "multiple_choice",
    options: [
      { emoji: "🛏️", label: "On dirait un hôtel 5 étoiles !" },
      { emoji: "😊", label: "Pas mal, c’est relaxant" },
      { emoji: "😐", label: "Ça passe, sans plus" },
      { emoji: "🙁", label: "Si on peut appeler cela une chambre…" },
    ],
  },
  {
    id: 5,
    text: "Le ménage dans les lieux communs (salles de bain/toilettes), ça le fait ?",
    type: "multiple_choice",
    options: [
      { emoji: "✨", label: "Nickel chrome !" },
      { emoji: "😊", label: "C’est propre la plupart du temps" },
      { emoji: "😐", label: "Ça pourrait être mieux" },
      { emoji: "🙁", label: "Y’a pas pire …" },
    ],
  },
  {
    id: 6,
    text: "Les repas ici, t’en penses quoi ?",
    type: "multiple_choice",
    options: [
      { emoji: "🍔", label: "Trop bon, on dirait un resto !" },
      { emoji: "😊", label: "Pas mal, je me régale parfois" },
      { emoji: "😐", label: "Ça se mange…" },
      { emoji: "🙁", label: "C’est un régime forcé ou quoi ?" },
    ],
  },
  {
    id: 7,
    text: "Tu te sens mieux compris(e) sur ce que tu ressens depuis que tu es ici ?",
    type: "multiple_choice",
    options: [
      { emoji: "😎", label: "Oui, carrément !" },
      { emoji: "😊", label: "Un peu mieux" },
      { emoji: "😐", label: "Pas vraiment" },
      { emoji: "🙁", label: "Pas du tout" },
    ],
  },
  {
    id: 8,
    text: "Tu as compris les explications sur ce qui t’arrive ?",
    type: "multiple_choice",
    options: [
      { emoji: "🧠", label: "Oui, tout est clair" },
      { emoji: "😊", label: "Ça va, dans l’ensemble" },
      { emoji: "😐", label: "Un peu confus" },
      { emoji: "🙁", label: "Non, j’ai rien compris" },
    ],
  },
  {
    id: 9,
    text: "Tu as eu l’occasion de donner ton consentement (accord) pour les décisions prises durant ton séjour ?",
    type: "multiple_choice",
    options: [
      { emoji: "🛡️", label: "Oui, tout le temps" },
      { emoji: "😊", label: "Oui, la plupart du temps" },
      { emoji: "😐", label: "Parfois, mais pas toujours" },
      { emoji: "🙁", label: "Non, pas vraiment" },
    ],
  },
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
  {
    id: 13,
    text: "Tu as été présenté(e) aux autres adolescents à ton arrivée ?",
    type: "multiple_choice",
    options: [
      { emoji: "🎉", label: "Oui, tout de suite" },
      { emoji: "😊", label: "Oui, un peu plus tard" },
      { emoji: "😐", label: "Pas vraiment" },
      { emoji: "🙁", label: "Non, pas du tout" },
    ],
  },
  {
    id: 14,
    text: "Comment tu trouves l’ambiance générale dans le service ?",
    type: "multiple_choice",
    options: [
      { emoji: "😄", label: "Super sympa, j'adore !" },
      { emoji: "😊", label: "Ça va, c’est correct" },
      { emoji: "😐", label: "Moyen, sans plus" },
      { emoji: "🙁", label: "Pas du tout ma vibe" },
    ],
  },
  {
    id: 15,
    text: "Tu es à l’aise avec le partage de ta chambre ?",
    type: "multiple_choice",
    options: [
      { emoji: "🛏️", label: "Oui, c’est cool !" },
      { emoji: "😊", label: "Ça passe" },
      { emoji: "😐", label: "Un peu compliqué parfois" },
      { emoji: "🙁", label: "Non, j’aimerais plus d’intimité" },
    ],
  },
  {
    id: 16,
    text: "On t’a expliqué le suivi et/ou les médocs à prendre après ta sortie ?",
    type: "multiple_choice",
    options: [
      { emoji: "💊", label: "Oui, j’ai tout capté" },
      { emoji: "😊", label: "À peu près" },
      { emoji: "😐", label: "Pas tout compris…" },
      { emoji: "🙁", label: "On m’a dit quoi déjà ?" },
    ],
  },
  {
    id: 17,
    text: "T’as compris quand tu pourras reprendre tes activités (école, sport) ?",
    type: "multiple_choice",
    options: [
      { emoji: "🏃", label: "Oui, c’est bien clair" },
      { emoji: "😊", label: "Oui, mais pas tout" },
      { emoji: "😐", label: "Un peu confus" },
      { emoji: "🙁", label: "Je sais toujours pas" },
    ],
  },
  {
    id: 18,
    text: "Tu sais quoi faire si tu te sens mal après ta sortie (contacts) ?",
    type: "multiple_choice",
    options: [
      { emoji: "🚨", label: "Oui, tout est prévu" },
      { emoji: "😊", label: "Oui, en gros…" },
      { emoji: "😐", label: "Pas tout, j’avoue" },
      { emoji: "🙁", label: "Non, je suis paumé(e)" },
    ],
  },
  {
    id: 19,
    text: "En gros, c’est quoi ton ressenti sur l’ensemble de ton séjour ici ?",
    type: "scale",
    scaleMax: 4,
  },
];


function QuizPage() {
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
        <img src={logo} alt="Logo" className="app-logo" style={{ maxWidth: "100vw" }} />
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
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default QuizPage;
