import React, { useState } from "react";
import { ITrack } from "@/common/types/track.types";
import MainLayout from "@/common/layouts/main-layout.layouts";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { APP_KEYS, THEME } from "@/common/consts";
import trackService from "@/services/track.service";
import { useInput } from "@/common/hooks/useInput.hook";

interface ITrackPageProps {
  serverTrack: ITrack;
}

const TrackPage = ({ serverTrack }: ITrackPageProps) => {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const newComment = await trackService.sendComment(
        username.value,
        text.value,
        track._id
      );
      setTrack({ ...track, comments: [...track.comments, newComment] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={`${track.artist}-${track.name}`}
      keywords={track.artist + "," + track.name + "," + track.text}
    >
      <Button
        variant="outlined"
        style={{ fontSize: THEME.FONT_SIZES.big }}
        onClick={() => {
          router.push(APP_KEYS.ROUTES.TRACKS);
        }}
      >
        Back to songs list
      </Button>
      <Grid container style={{ margin: "20px 0px" }}>
        <img
          src={APP_KEYS.BACKEND_KEYS.MAIN_URL + track.picture}
          width={200}
          height={200}
        />
        <div style={{ margin: "0px 30px" }}>
          <h1>Song:{track.name}</h1>
          <h1>Artist:{track.artist}</h1>
          <h1>Listens:{track.listens}</h1>
        </div>
      </Grid>
      <h1>Lyrics</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField
          {...username}
          fullWidth
          label="Your name"
          style={{ marginBottom: 10 }}
        />
        <TextField {...text} fullWidth label="Comment" multiline rows={4} />
        <Button onClick={addComment}>Cofirm comment</Button>
      </Grid>
      <div>
        {track.comments?.map((comment) => (
          <div
            style={{
              border: "3px black solid",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
            key={comment._id}
          >
            <h1>{comment.username}</h1>
            <h4 style={{ marginLeft: "10px", width: "100%" }}>
              {comment.text}
            </h4>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps = async ({ params }: any) => {
  const track = await trackService.getTrack(params.id);
  return {
    props: { serverTrack: track },
  };
};
