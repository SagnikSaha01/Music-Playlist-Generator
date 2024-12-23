import React from 'react';

function inputwrapper({ query, onInputChange }) {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        value={query}
        onChange={onInputChange}
        placeholder="Describe a mood, vibe, or emotion..."
        className="gradient-input"
      />
    </div>
  );
}

export default inputwrapper;
