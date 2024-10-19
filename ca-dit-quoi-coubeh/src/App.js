import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
