//one import of react
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
 
//now i import my function from the spotify so that when the user click on the login button
//this new page shows up
//import SpotifyWebApi from "spotify-web-api-js";
//import Player from "./Player";
//import { useDataLayerValue } from "./DataLayer";
//import Header from "./Header";

//const spotify = new SpotifyWebApi();

function App() {
 /* <h1> hello</h1>
  //const [{ user, token }, dispatch] = useDataLayerValue();
  const [token, setToken] = useState();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;
    //check if i have the token , so i can login on the page
    if (token) {
      setToken(token);
      console.log("[token]", token);
      //spotify.setAccessToken(token);
       
    
    }
  }, []);

 
  return (
    
    //the login depends on the token
      // if i don't have a log account, the page will redirect me to the login page
    <div className="App">
      {token ? <h1> Logged in</h1> : < login />}
    </div>
  );*/
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
 

export default App;
