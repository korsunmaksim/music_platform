import React, { useEffect, useState } from "react";
import MainLayout from "@/common/layouts/main-layout.layouts";
import { StepWrapper } from "@/common/components/step_wraper";
import { Button, Grid, TextField } from "@material-ui/core";
import { FileUpload } from "@/common/components/file_upload";
import { useInput } from "@/common/hooks/useInput.hook";
import trackService from "@/services/track.service";
import { useRouter } from "next/router";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cover, setCover] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const lyrics = useInput("");
  const router = useRouter();

  const nextHandler = () => {
    if (activeStep !== 2) setActiveStep((prev) => prev + 1);
    else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", lyrics.value);
      formData.append("picture", cover!);
      formData.append("audio", audio!);
      trackService.createTrack(formData, router);
    }
  };

  const backHandler = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout title={"Upload new song"}>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              label="Name of the song"
              style={{ marginBottom: 10 }}
            />
            <TextField
              {...artist}
              label="Artist"
              style={{ marginBottom: 10 }}
            />
            <TextField
              {...lyrics}
              label="Lyrics"
              multiline
              rows={10}
              style={{ marginBottom: 10 }}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setCover} accept="image/*">
            <Button>Choose cover</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Choose audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={backHandler}>
          Back
        </Button>
        <Button onClick={nextHandler}>
          {activeStep === 2 ? "Upload" : "Next"}
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
