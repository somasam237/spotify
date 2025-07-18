import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (volume) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      if (error.response?.status === 403) {
        console.log("Spotify Premium required to control volume");
        // Optionally show user message or disable volume control
        return;
      }
      console.error("Error setting volume:", error);
    }
  };
  return (
    <Container>
      <input type="range" onMouseUp={(e) => setVolume(e.target.value)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
