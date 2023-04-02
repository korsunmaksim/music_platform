import React from "react";
import { ITrack } from "@/common/types/track.types";
import { Card, Grid, IconButton } from "@mui/material";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import styles from "../../styles/TrackItem.module.scss";
import { APP_KEYS, THEME } from "@/common/consts";
import { useActions } from "@/common/hooks/useActions.hooks";
import { useRouter } from "next/router";
import { useTypedSelector } from "@/common/hooks/useTypedSelector.hook";
import { getMinutes } from "../track_progress/track_progress.components";
import trackService from "@/services/track.service";

interface ITrackItemProps {
  track: ITrack;
}

export const TrackItem = ({ track }: ITrackItemProps) => {
  const router = useRouter();
  const { playTrack, setActiveTrack, pauseTrack } = useActions();
  const { active, pause, currentTime, duration } = useTypedSelector(
    (state) => state.player
  );

  const playHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  const deleteHandler = () => {
    trackService.deleteTrack(track._id, router);
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push(APP_KEYS.ROUTES.TRACKS + "/" + track._id)}
    >
      <IconButton onClick={playHandler}>
        {active?.name === track.name && !pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        width={70}
        height={70}
        src={APP_KEYS.BACKEND_KEYS.MAIN_URL + track.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: "max(90%,90px)", margin: "0 20px" }}
      >
        <div
          style={{
            fontSize: THEME.FONT_SIZES.normal,
          }}
        >
          {track.name}
        </div>
        <div
          style={{
            fontSize: THEME.FONT_SIZES.small,
            color: THEME.COLORS.artist_name,
          }}
        >
          {track.artist}
        </div>
      </Grid>
      {active?.name === track.name && (
        <div>
          {getMinutes(currentTime)}/{getMinutes(duration)}
        </div>
      )}
      <IconButton style={{ marginLeft: "auto" }}>
        <Delete
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler();
          }}
        />
      </IconButton>
    </Card>
  );
};
