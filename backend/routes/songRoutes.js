import { Router } from 'express';

import { login, createPlaylist, callback, logout, addSongs, getAccessToken, searchSong, getTrackImage } from '../controllers/spotifyFunctions.js';

const router = Router();

router.get('/get-token', async () => {
    try{
        const result = await getAccessToken();
        console.log("Current spotify token: " + result);
    } catch(error) {
        console.log("err");
    }
});
router.get('/search', async(req, res) => {
    const {songName, songArtist } = req.query;
    try{
        const result = await searchSong(songName, songArtist);
        console.log("Track ID for song: " + result);
        res.send(result);
    } catch(error) {
        console.log("error on search");
        console.log("song name: " + songName);
        console.log("song artist: " + songArtist);
    }
});

router.get('/get-image-link', async(req, res) => {
    const { id } = req.query;
    try{
        const result = await getTrackImage(id);
        console.log("Track image url: " + result);
        res.send(result);
    } catch(error) {
        console.log("error on image");
    }

}); 
router.get('/spotifylogin', login);
router.get('/callback', callback);
router.get('/create', createPlaylist);
router.get('/add', addSongs);
router.get('/logout', logout);

export default router;
