import React from 'react'
import "./login.css";
import {loginUrl} from './Spotify';
function login() {
  return (
    <div className='login'>
      <h1> titre</h1>
      <img src='https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg'
     alt='Spotify Logo'/>
       <a href={loginUrl}>Login With Spotify</a> 
    </div>
  )
}

export default login
