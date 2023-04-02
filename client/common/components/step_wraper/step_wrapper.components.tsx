import React from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
} from "@material-ui/core";
import { APP_KEYS } from "@/common/consts";

interface IStepWrapperProps {
  activeStep: number;
  children: React.ReactNode;
}

export const StepWrapper = ({ activeStep, children }: IStepWrapperProps) => {
  return (
    <Container style={{ marginBottom: "250px" }}>
      <Stepper activeStep={activeStep}>
        {APP_KEYS.STEPPER_STEPS.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0px", height: "270px" }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};
