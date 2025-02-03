//one import of react
import React, { useEffect, useState } from "react";
import login from "./login"; 
 
//now i import my function from the spotify so that when the user click on the login button
//this new page shows up
import { getTokenFromUrl } from "./Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";

const spotify = new SpotifyWebApi();


  function App() {
    const [{ user, token }, dispatch] = useDataLayerValue();
  
    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";

      const access_token  = hash;
      const _token = hash.access_token;



     // const _token = hash.access_token;
      //check if i have the token , so i can login on the page
      if (_token) {
        dispatch({
          type: "SET_TOKEN",
          token: _token,
        });
        console.log("[token]", token);
        spotify.setAccessToken(_token);
        spotify.getMe().then((user) => {
          dispatch({
            type: "SET_USER",
            user,
          });
        });
        spotify.getUserPlaylists().then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists,
          });
        });
        spotify.getPlaylist("cdc84f4346cc45c6bcc30260c36460c7").then((playlist) => {
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: playlist,
          });
        });
      }
    }, []);

 
  return (
    
    //the login depends on the token
      // if i don't have a log account, the page will redirect me to the login page
  
        <div className="App">
          {token ? <Player spotify={spotify} /> : <login />}
        </div>
      );
    }
    
    export default App;
