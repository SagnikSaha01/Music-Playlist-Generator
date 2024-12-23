import React from 'react';

function albumcard({ title, imageUrl }) {
  return (
    <div className="album-card">
      <div className="album-image-wrapper">
        <img src={imageUrl} alt={title} className="album-image" />
      </div>
      <p className="album-frame">{}</p>
      <div className="album-icons">
        <img src="/dislike1.svg" alt="Dislike icon" width="25" />
        <br />
        <img src="/like1.svg" alt="Like icon" width="25" />
      </div>
    </div>
  );
}

export default albumcard;
