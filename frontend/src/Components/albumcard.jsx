import React, { useState } from 'react';

function AlbumCard({ title, imageUrl }) {
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleDislikeClick = () => {
    setIsDisliked(true);
    setTimeout(() => setIsDisliked(false), 500); // Reset after animation
  };

  const handleLikeClick = () => {
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 500); // Reset after animation
  };

  return (
    <div className="album-card">
      <h3 className="album-title">{title}</h3>
      <div className="album-image-wrapper">
        <img src={imageUrl} alt={title} className="album-image" />
      </div>
      <p className="album-frame">{""}</p>
      <div className="album-icons">
        {/* Dislike button */}
        <button
          onClick={handleDislikeClick}
          className={`minus-icon ${isDisliked ? 'clicked' : ''}`}
          aria-label="Dislike this album"
        >
          <img src="/dislike1.svg" alt="Dislike icon" width="25" />
        </button>
        <br />
        {/* Like button with SVG */}
        <button
          onClick={handleLikeClick}
          className={`heart-icon ${isLiked ? 'clicked' : ''}`}
          aria-label="Like this album"
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2042 1.87886C18.1286 0.748832 16.6845 0.0809658 15.1582 0.00769666C13.6319 -0.0655725 12.1348 0.461106 10.964 1.48329C10.8293 1.58914 10.6671 1.65017 10.4985 1.6584C10.3289 1.65325 10.1653 1.59191 10.0315 1.48329C8.8612 0.460524 7.36429 -0.0665475 5.83803 0.0067325C4.31178 0.0800125 2.8678 0.748285 1.79281 1.87886C1.22258 2.46942 0.770506 3.1719 0.462771 3.94562C0.155037 4.71935 -0.00224752 5.54896 2.42627e-05 6.38642C2.42627e-05 8.08906 0.63666 9.69008 1.75377 10.8502L8.45346 19.0163C8.70592 19.3247 9.01965 19.5724 9.37298 19.7422C9.72632 19.9121 10.1108 20 10.5 20C10.8892 20 11.2737 19.9121 11.627 19.7422C11.9804 19.5724 12.2941 19.3247 12.5465 19.0163L19.2057 10.894C19.7761 10.3034 20.2283 9.601 20.5363 8.82729C20.8443 8.05358 21.0019 7.22396 21 6.38642C21.0013 5.54883 20.8433 4.71927 20.535 3.94561C20.2268 3.17196 19.7745 2.46952 19.2042 1.87886ZM18.1201 9.84956L11.4204 18.0157C10.9595 18.5786 10.0375 18.5786 9.57658 18.0157L2.83786 9.80578C2.40547 9.35771 2.06273 8.82478 1.82948 8.23784C1.59623 7.6509 1.47711 7.02162 1.479 6.38642C1.479 5.09497 1.96098 3.88013 2.83786 2.96705C3.26883 2.51513 3.78134 2.15636 4.34592 1.91139C4.91049 1.66641 5.51601 1.54005 6.12764 1.53958C7.20165 1.53886 8.24173 1.93123 9.06607 2.6481C9.12763 2.70438 9.67868 3.19688 10.4985 3.19688C11.2958 3.19688 11.8589 2.7122 11.9099 2.6653C12.7975 1.88996 13.9327 1.49045 15.09 1.54606C16.2474 1.60167 17.3424 2.10833 18.1576 2.96549C18.5917 3.41867 18.9353 3.95688 19.1685 4.54905C19.4017 5.14123 19.52 5.77564 19.5165 6.41567C19.513 7.0557 19.3878 7.68867 19.1481 8.27805C18.9085 8.86743 18.5591 9.40154 18.1201 9.84956Z"
              fill="#B3B3B3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;
