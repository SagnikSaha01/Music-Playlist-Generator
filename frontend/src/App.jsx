import React, { useState } from 'react';
import './App.css';
import InputWrapper from './Components/inputwrapper';
import AlbumCard from './Components/albumcard';
import Button from './Components/button';
import Refresh from './Components/refresh'; // Import Refresh component

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
  const [albums, setAlbums] = useState([]); // State for albums
  const [showAlbums, setShowAlbums] = useState(false); // State to show albums and Refresh button
  const [refreshClicked, setRefreshClicked] = useState(false); // State to track if Refresh button is clicked

  // Handle Generate button click
  const handleGenerateClick = () => {
    setAlbums([]); // Clear existing albums to reset the animation
    setShowAlbums(false); // Hide albums temporarily while resetting
    setTimeout(() => {
      setAlbums(albumsMockData); // Set new albums
      setShowAlbums(true); // Show albums after animation reset
    }, 100); // Delay to allow resetting the DOM
  };

  // Handle Refresh button click
  const handleRefreshClick = () => {
    setRefreshClicked(true); // Set refresh clicked state to trigger animation
    setAlbums([]); // Clear existing albums to reset the animation
    setShowAlbums(false); // Hide albums temporarily while resetting
    setTimeout(() => {
      setAlbums(albumsMockData); // Set new albums
      setShowAlbums(true); // Show albums after animation reset
      setRefreshClicked(false); // Reset refresh state after animation
    }, 500); // Delay to allow for the animation
  };

  // Handle New Button click (Custom action)
  const handleNewButtonClick = () => {
    alert('New Action Button Clicked!'); // Replace with desired functionality
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="heading">What are we feelin?</h1>
      <InputWrapper query={query} onInputChange={handleInputChange} />
      <Button text="Generate" onClick={handleGenerateClick} className="generate-button" />

      {/* Conditionally render the Refresh button after clicking Generate */}
      {showAlbums && (
        <Refresh
          text="&#x21bb;"
          onClick={handleRefreshClick}
          className={`refresh-button ${refreshClicked ? 'clicked' : ''}`} // Apply clicked class when refresh is clicked
        />
      )}

      {/* Conditionally render the album cards after clicking Generate */}
      {showAlbums && (
        <div className="albums-container">
          {albums.map((album, index) => (
            <AlbumCard
              key={album.title}
              title={album.title}
              imageUrl={album.imageUrl}
              style={{ animationDelay: `${index * 0.5}s` }} // Add delay for each album
            />
          ))}
        </div>
      )}

      {/* Add a new button below the album cards */}
      {showAlbums && (
        <Button
          text="Export to Playlist"
          onClick={handleNewButtonClick}
          className="export-button"
        />
      )}
    </div>
  );
}

export default App;
