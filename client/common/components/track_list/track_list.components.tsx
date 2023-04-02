import React from "react";
import { ITrack } from "@/common/types/track.types";
import { Grid, Box } from "@mui/material";
import { TrackItem } from "../track_item";

interface ITrackListProps {
  tracks: ITrack[];
}

export const TrackList = ({ tracks }: ITrackListProps) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};
