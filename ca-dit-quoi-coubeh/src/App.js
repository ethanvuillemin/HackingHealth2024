import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import Home from './pages/Home';
import './App.css'; // Import global styles
import Guide from './pages/Guide';
import Themes from './pages/Themes';
import Acceuil from "./pages/Quiz/Acceuil";
import Avis from "./pages/Quiz/Avis";
import Collectif from "./pages/Quiz/Collectif";
import Experience from "./pages/Quiz/Experience";
import Lieu from "./pages/Quiz/Lieu";
import Prise from "./pages/Quiz/Prise";
import Sortie from "./pages/Quiz/Sortie";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/themes" element={<Themes />} />

          <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/collectif" element={<Collectif />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/lieu" element={<Lieu />} />
          <Route path="/prise" element={<Prise />} />
          <Route path="/sortie" element={<Sortie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
