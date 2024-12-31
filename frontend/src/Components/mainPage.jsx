import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import InputWrapper from './inputwrapper';
import AlbumCard from './albumcard';
import Button from './button';
import Refresh from './refresh'; // Import Refresh component

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

function mainPage() {
  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState([]); // State for albums
  const [showAlbums, setShowAlbums] = useState(false); // State to show albums and Refresh button
  const [refreshClicked, setRefreshClicked] = useState(false); // State to track if Refresh button is clicked

  // Handle Generate button click
  const handleGenerateClick = async () => {
    // Clear existing albums
    setAlbums([]);
    setShowAlbums(false);

    try {
      // Call your backend with user’s query
      const response = await axios.post('http://localhost:3000/api/get-response', {
        input: query
      });
      // response.data should have the structure:
      // {
      //   mood: "...",
      //   "strength of the mood": "...",
      //   songs: [
      //     { songName: "song1", artistsName: "artist1" },
      //     ...
      //   ]
      // }
      const { songs } = response.data;

      // If your UI expects album objects with title, imageUrl, etc.,
      // transform the GPT "songs" array to match your UI props.
      // For now, let’s just do a quick mapping:
      const newAlbums = songs.map((songObj) => ({
        title: songObj.songName,
        imageUrl: 'https://via.placeholder.com/150/222222/FFFFFF?text=' + songObj.songName, 
      }));

      // Timeout to keep your original small delay (optional)
      setTimeout(() => {
        setAlbums(newAlbums);
        setShowAlbums(true);
      }, 100);

    } catch (error) {
      console.error('Error fetching data from /get-response:', error);
    }
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
          onClick={handleGenerateClick}
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


export default mainPage;
