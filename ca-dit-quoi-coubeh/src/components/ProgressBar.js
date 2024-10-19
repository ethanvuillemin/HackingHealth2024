import React from 'react';
import './ProgressBar.css'; // Import component-specific styles

function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;