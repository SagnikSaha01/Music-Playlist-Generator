
import querystring from 'querystring';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
//const querystring = require('querystring');
//const axios = require('axios');
//const path = require('path');
//require('dotenv').config();

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
var redirect_uri = "http://localhost:3000/callback"


let accessToken;
let authorizationCode;
let playlistID;
let songIDS = [];

//Redirects to spotify login page
export const login = async(req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
              response_type: 'code',
              client_id: clientID,
              redirect_uri: redirect_uri,
              scope:'playlist-modify-public'
            }));
        
} 
//Redirection to get authorization codes
export const callback = async(req, res) => {
    authorizationCode = req.query.code;
    console.log('Current authorization code -->', authorizationCode);
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirect_uri,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))
        }
    });

    accessToken = response.data.access_token;
    console.log('Current access token -->', accessToken);

    res.redirect('/create');

}

//Creates a playlist directly into the spotify account that logged in
export const createPlaylist = async(req, res) => {
        const response = await axios.post(
            'https://api.spotify.com/v1/me/playlists',
            {
                name: 'Test playlist',
                description: 'Test description',
                public: true
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
   
            playlistID = response.data.id;
            res.redirect("/add");
   
}
//Adds song to the playlist made earlier
export const addSongs = async(req, res) => {
    //Example songs for demo purposes
    let exampleSongIDS = [
        'spotify:track:2xLMifQCjDGFmkHkpNLD9h', //Sicko Mode by Travis Scott
        'spotify:track:15hJmqqEtASVXl6sM7i4UF', //Trademark usa by Baby Keem
        'spotify:track:7xQAfvXzm3AkraOtGPWIZg', //Wow by Post Malone
        'spotify:track:1qMMYpVatbRITKCfq1gasi', //Puffin on Zootiez by Future
        'spotify:track:4Na2HfNSr58chvfX69fy36', //One of wun by Gunna
        'spotify:track:2t8yVaLvJ0RenpXUIAC52d', //a lot by 21 Savage
        'spotify:track:3ioJs8DQw527GmqJIp5gZG', //Nail tech by Jack Harlow
        'spotify:track:6HZILIRieu8S0iqY8kIKhj', //DNA by Kendrick Lamar
    ];
    
    // let songList = [
    //     'spotify:track:' + songsIDS[0],
    //     'spotify:track:' + songsIDS[1],
    //     'spotify:track:' + songsIDS[2],
    //     'spotify:track:' + songsIDS[3],
    //     'spotify:track:' + songsIDS[4],
    // ]
    getTrackImage("2t8yVaLvJ0RenpXUIAC52d");
    searchSong("Puffin on Zootiez", "Future");
    const response = await axios.post(
        'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
        {
            uris: exampleSongIDS
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        res.redirect("/");
}

//Redirects to spotify logout page
export const logout = (req, res) => {
    res.redirect('https://accounts.spotify.com/logout');
}

async function getTrackImage(trackuri) {
    const response = await axios.get(
        'https://api.spotify.com/v1/tracks/' + trackuri,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.album.images[0].url);
}


async function searchSong(songName, songArtist) {

    const response = await axios.get(
        'https://api.spotify.com/v1/search/',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                q: 'track:' + songName + ' artist:' + songArtist,
                type:'track',
                limit: 1
            }
        });
        const id = response.data.tracks.items[0].id;
        songIDS.push(id);
        console.log(id);
} 