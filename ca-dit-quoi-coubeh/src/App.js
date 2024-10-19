import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import Home from './pages/Home';
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/quizz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
