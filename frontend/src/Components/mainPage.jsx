import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import InputWrapper from './InputWrapper';
import AlbumCard from './AlbumCard';
import Button from './Button';
import Refresh from './Refresh'; // Import Refresh component
import { useNavigate } from 'react-router-dom';
import { use } from 'react';


const MainPage = () => { // Changed from mainPage to MainPage
  

  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState([]); // State for albums
  const [showAlbums, setShowAlbums] = useState(false); // State to show albums and Refresh button
  const [refreshClicked, setRefreshClicked] = useState(false); // State to track if Refresh button is clicked
  const songList = [];
  const fetchToken = async () => {
      const response = await axios.get('http://localhost:3000/api/get-token');
    };
  const navigate = useNavigate();
  
  const getImage = async (n,a) => { //Function for getting song images
    
    const response = await axios.get('http://localhost:3000/api/search',{
      params: {
        songName:  n,
        songArtist: a,
      }
    });
    songList.push(response.data);
    const imgLink = await axios.get('http://localhost:3000/api/get-image-link', {
      params: {
        id: response.data
      }
    });
    console.log(songList);
    return imgLink.data;
  };
  const addSongsToPlaylist = async(songIDS) => {
    const response = await axios.get('http://localhost:3000/api/create');
    console.log("new playlist id:" + response.data);
    const add = await axios.get('http://localhost:3000/api/add',{
      params: {
        songs: songIDS,
        playlistID: response.data,
      }
    })
  }


  const handleGenerateClick = async () => {
    setAlbums([]);
    setShowAlbums(false);
    fetchToken();
    try {
      const response = await axios.post('http://localhost:3000/api/get-response', {
        input: query,
      });

      const { songs } = response.data;

      const newAlbums = await Promise.all( 
      songs.map(async (songObj) => (
         
      {
        title: songObj.songName,
        imageUrl: await getImage(songObj.songName, songObj.artistsName),
      })));

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
    window.location.href = 'http://localhost:3000/api/spotifylogin'
    //addSongsToPlaylist(songList);
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
          text="Export to Spotify"
          onClick={handleNewButtonClick}
          className="export-button"
        />
      )}
    </div>
  );
};

export default MainPage; // Updated component name
