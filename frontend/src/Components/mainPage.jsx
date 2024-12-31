import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import InputWrapper from './InputWrapper';
import AlbumCard from './AlbumCard';
import Button from './Button';
import Refresh from './Refresh'; // Import Refresh component
import { useNavigate } from 'react-router-dom';

const MainPage = () => { // Changed from mainPage to MainPage
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState([]); // State for albums
  const [showAlbums, setShowAlbums] = useState(false); // State to show albums and Refresh button
  const [refreshClicked, setRefreshClicked] = useState(false); // State to track if Refresh button is clicked

  const handleGenerateClick = async () => {
    setAlbums([]);
    setShowAlbums(false);

    try {
      const response = await axios.post('http://localhost:3000/api/get-response', {
        input: query,
      });

      const { songs } = response.data;

      const newAlbums = songs.map((songObj) => ({
        title: songObj.songName,
        imageUrl: `https://via.placeholder.com/150/222222/FFFFFF?text=${songObj.songName}`,
      }));

      setTimeout(() => {
        setAlbums(newAlbums);
        setShowAlbums(true);
      }, 100);
    } catch (error) {
      console.error('Error fetching data from /get-response:', error);
    }
  };

  const handleRefreshClick = () => {
    setRefreshClicked(true);
    setAlbums([]);
    setShowAlbums(false);

    setTimeout(() => {
      setAlbums(albumsMockData);
      setShowAlbums(true);
      setRefreshClicked(false);
    }, 500);
  };

  const handleNewButtonClick = () => {
    alert('New Action Button Clicked!');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/logout', {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Logged out successfully!');
        navigate('/login');
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="app-container">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="heading">What are we feelin?</h1>
      <InputWrapper query={query} onInputChange={handleInputChange} />
      <Button text="Generate" onClick={handleGenerateClick} className="generate-button" />

      {showAlbums && (
        <Refresh
          text="&#x21bb;"
          onClick={handleGenerateClick}
          className={`refresh-button ${refreshClicked ? 'clicked' : ''}`}
        />
      )}

      {showAlbums && (
        <div className="albums-container">
          {albums.map((album, index) => (
            <AlbumCard
              key={album.title}
              title={album.title}
              imageUrl={album.imageUrl}
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </div>
      )}

      {showAlbums && (
        <Button
          text="Export to Playlist"
          onClick={handleNewButtonClick}
          className="export-button"
        />
      )}
    </div>
  );
};

export default MainPage; // Updated component name
