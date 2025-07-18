import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  useEffect(() => {
    const getPlaybackState = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        if (data) {
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: data.is_playing,
          });
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("No active device found");
          // Set player state to false when no device is active
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: false,
          });
        } else if (error.response?.status === 403) {
          console.log("Spotify Premium required for playback control");
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: false,
          });
        } else {
          console.error("Error getting playback state:", error);
        }
      }
    };
    getPlaybackState();
  }, [dispatch, token]);
  useEffect(() => {
    // Load Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'My React Spotify App',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // Set this device as active
        setActiveDevice(device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }, [token]);

  const setActiveDevice = async (device_id) => {
    try {
      await axios.put("https://api.spotify.com/v1/me/player", {
        device_ids: [device_id],
        play: false
      }, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error setting active device:", error);
    }
  };
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar $navBackground={navBackground} />
          <div className="body__contents">
            <Body $headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
