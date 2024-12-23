import React, { useState } from 'react';
import './App.css';


const albumsMockData = [
  {
    title: 'Song 1',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Song 1',
  },
  {
    title: 'Song 2',
    imageUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Song 2',
  },
  {
    title: 'Song 3',
    imageUrl: 'https://via.placeholder.com/150/444444/FFFFFF?text=Song 3',
  },
  {
    title: 'Song 4',
    imageUrl: 'https://via.placeholder.com/150/888888/FFFFFF?text=Song 4',
  },
  {
    title: 'Song 5',
    imageUrl: 'https://via.placeholder.com/150/222222/FFFFFF?text=Song 5',
  },
];

function App() {
  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState(albumsMockData);

  const handleGenerateClick = () => {
    // Placeholder for generating something based on `query`
    alert(`Generating something for: "${query}"`);
  };

  const handleRefreshClick = () => {
    // Refresh logic or fetching new data
    alert('Refreshed!');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Heading */}
      <h1 className="heading">What are we feelin?</h1>

      {/* Input with gradient border */}
      <div className="input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Describe a mood, vibe, or emotion..."
          className="gradient-input"
        />
      </div>

      {/* Generate Button */}
      <button className="generate-button" onClick={handleGenerateClick}>
        Generate
      </button>

      {/* Refresh Button (using a Unicode symbol or an emoji) */}
      <button className="refresh-button" onClick={handleRefreshClick}>
        &#x21bb; {/* Unicode for a rotating arrow */}
      </button>

      {/* Album Cards */}
      <div className="albums-container">
        {albums.map((album) => (
          <div className="album-card" key={album.id}>
            <div className="album-image-wrapper">
              <img src={album.imageUrl} alt={album.title} className="album-image" />
            </div>
            <p className="album-frame">
              
            </p>
            {/* Icons row */}
            <div className="album-icons">
              <img src="/dislike1.svg" alt="Dislike icon" width = "25" />
              <br></br>
              <img src="/like1.svg" alt="Like icon" width = "25" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
