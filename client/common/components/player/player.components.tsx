import React, { useEffect } from "react";
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import { IconButton, Grid } from "@mui/material";
import { APP_KEYS, THEME } from "@/common/consts";
import { useTypedSelector } from "@/common/hooks/useTypedSelector.hook";
import { useActions } from "@/common/hooks/useActions.hooks";
import { TrackProgress } from "../track_progress";
import styles from "../../styles/Player.module.scss";

let audio: HTMLAudioElement;

export const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } =
    useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      playHandler();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = APP_KEYS.BACKEND_KEYS.MAIN_URL + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const playHandler = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const changeCurrentTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if (!active) {
    return null;
  }

  return (
    <div
      style={{ visibility: `${active ? "visible" : "hidden"}` }}
      className={styles.player}
    >
      <IconButton onClick={playHandler}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: "20%", margin: "0 20px" }}
      >
        <div
          style={{
            fontSize: THEME.FONT_SIZES.normal,
            color: "black",
          }}
        >
          {active?.name}
        </div>
        <div
          style={{
            fontSize: THEME.FONT_SIZES.small,
            color: "black",
          }}
        >
          {active?.artist}
        </div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTimeHandler}
        type="duration"
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress
        left={volume}
        right={100}
        onChange={changeVolumeHandler}
        type="volume"
      />
    </div>
  );
};
