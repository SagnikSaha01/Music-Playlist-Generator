import React, { useState } from 'react';
import './App.css';
/*ignore these errors */
import InputWrapper from './Components/inputwrapper';
import AlbumCard from './Components/albumcard';
import Button from './Components/button';

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
    alert(`Generating something for: "${query}"`);
  };

  const handleRefreshClick = () => {
    alert('Refreshed!');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="heading">What are we feelin?</h1>
      <InputWrapper query={query} onInputChange={handleInputChange} />
      <Button text="Generate" onClick={handleGenerateClick} className="generate-button" />
      <Button text="&#x21bb;" onClick={handleRefreshClick} className="refresh-button" />
      <div className="albums-container">
        {albums.map((album, index) => (
          <AlbumCard key={index} title={album.title} imageUrl={album.imageUrl} />
        ))}
      </div>
    </div>
  );
}

export default App;
