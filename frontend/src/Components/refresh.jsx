import React, { useState } from 'react';

const Refresh = ({ text, onClick, className }) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    // Trigger the rotation state
    setIsRotated(true);
    
    // Wait for the rotation animation to finish (300ms)
    setTimeout(() => {
      if (onClick) {
        onClick();  // Call the passed onClick function (alert in this case)
      }
      setIsRotated(false);  // Reset the rotation state after the animation
    }, 300); // Matches the duration of the rotation animation
  };

  return (
    <button
      className={`${className} refresh-button ${isRotated ? 'rotated' : ''}`}
      onClick={handleClick}
      aria-label="Refresh"
    >
      {text}
    </button>
  );
};

export default Refresh;
