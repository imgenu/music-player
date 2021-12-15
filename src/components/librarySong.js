import React from "react";
import { playAudio } from "../util";
const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const { name, cover, artist, id, active } = song;
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);
    const newSong = songs.map((song) => {
      return song.id === id
        ? { ...song, active: true }
        : { ...song, active: false };
    });
    setSongs(newSong);
    if (isPlaying) audioRef.current.play().catch((err) => {});
    // playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${active ? "selected" : ""}`}
    >
      <img src={cover} alt={name} />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
