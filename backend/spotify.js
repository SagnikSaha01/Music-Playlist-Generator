const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
var redirect_uri = "http://localhost:3000/callback"

let accessToken;

function login(app) {
    app.get("/login", function(req, res) {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
              response_type: 'code',
              client_id: clientID,
              redirect_uri: redirect_uri,
              scope:'playlist-modify-public'
            }));
    });
    app.get('/callback', async (req, res) => {
        let authorizationCode = req.query.code;
        console.log('Authorization Code:', authorizationCode);
           
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
            console.log('Access Token:', accessToken);
    
            res.redirect('/create');
        
    });
}

function createPlaylist(app) {
    app.get('/create', async (req, res) =>{
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
    
            console.log(response.data.id);
            res.redirect("/");
    
    });
}


function logout(app) {
    app.get('/logout', (req, res) => {
        res.redirect('https://accounts.spotify.com/logout');
    });
}



module.exports = {login, createPlaylist, logout};