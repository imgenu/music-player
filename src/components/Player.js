import React, { useEffect } from "react";
import { playAudio } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  activeLibraryHandler,
}) => {
  // useEffect(() => {
  //   const newSong = songs.map((song) => {
  //     return song.id === currentSong.id
  //       ? { ...song, active: true }
  //       : { ...song, active: false };
  //   });
  //   setSongs(newSong);
  //   //playAudio(isPlaying, audioRef);
  // }, [currentSong]);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (nextIndex) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const newIndex =
      currentIndex + nextIndex < 0
        ? songs.length - 1
        : currentIndex + nextIndex;
    await setCurrentSong(songs[newIndex % songs.length]);
    activeLibraryHandler(songs[newIndex % songs.length]);
    if (isPlaying) audioRef.current.play().catch((err) => {});
  };

  // const activeLibraryHandler = (nextPrev) => {
  //   const newSong = songs.map((song) => {
  //     return song.id === nextPrev.id
  //       ? { ...song, active: true }
  //       : { ...song, active: false };
  //   });
  //   setSongs(newSong);
  // };
  const { currentTime, duration, animationPercentage } = songInfo;
  const trackAnim = { transform: `translateX(${animationPercentage}%)` };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            max={duration || 0}
            value={currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{duration ? getTime(duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(-1)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(+1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
export default Player;
