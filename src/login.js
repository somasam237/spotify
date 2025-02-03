import React from 'react'
import "./login.css";
import "./Spotify"

import { Card, CardContent } from "@mui/material";

function login() {

  const handleLogin = () => {
    const clientId =  "cdc84f4346cc45c6bcc30260c36460c7";
    const redirectUri = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <div className='login'>
      <Card>
        <CardContent>
        <h1> Spotify</h1>
      <img src='https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg'
     alt='Spotify Logo'/>

      <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
          >Login With Spotify </button>

     
        </CardContent>
      </Card>
     
    </div>
  )
}

export default login
