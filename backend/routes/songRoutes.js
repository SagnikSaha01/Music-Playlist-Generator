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
        console.log("error on search" + error.message);
        console.log("song name: " + songName);
        console.log("song artist: " + songArtist);
        console.log(result);
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
router.get('/spotifylogin', async(req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.log("error on spotify login" + error.message);
    }
});
router.get('/callback', callback);
router.get('/create', createPlaylist)

// async(req, res) => {
//     const { songs } = req.query;
//     try {
//         const result = await createPlaylist();
//         res.send(result);
//     } catch (error) {
//         console.log("error in creating playlist" + error.message);
//     }

// });
router.get('/add', addSongs); 
//     async(req, res) =>{
//     const { playlistID } = req.query;
//     try {
//         const result = await addSongs(playlistID);
//     } catch (error) {
//         console.log("error in adding songs to playlist" + error.message);
//     }

// }
// );
router.get('/spotifylogout', logout);

export default router;
