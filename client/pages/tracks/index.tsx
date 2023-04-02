import { APP_KEYS } from "@/common/consts";
import MainLayout from "@/common/layouts/main-layout.layouts";
import { Button, Card, Grid, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { TrackList } from "@/common/components/track_list";
import { useTypedSelector } from "@/common/hooks/useTypedSelector.hook";
import { NextThunkDispatch, wrapper } from "@/store";
import trackService from "@/services/track.service";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch() as NextThunkDispatch;

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(trackService.searchTracks(e.target.value));
      }, 500)
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Songs">
      <Grid container justifyContent="center">
        <Card style={{ width: "900px" }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Songs list</h1>
              <Button onClick={() => router.push(APP_KEYS.ROUTES.CREATE)}>
                Upload track
              </Button>
            </Grid>
          </Box>
          <TextField
            style={{ width: "75%", margin: "0px 10%" }}
            value={query}
            onChange={searchHandler}
          />
          {tracks.length !== 0 ? (
            <>
              <TrackList tracks={tracks} />
            </>
          ) : (
            <h1
              style={{
                margin: " 100px auto",
                width: "50%",
                textAlign: "center",
              }}
            >
              {"Songs list is empty!"}
            </h1>
          )}
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(trackService.getTracks());
  }
);
