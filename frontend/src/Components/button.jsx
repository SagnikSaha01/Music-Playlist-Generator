import React from 'react';

function button({ text, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default button;
