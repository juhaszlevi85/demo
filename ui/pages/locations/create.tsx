import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useMutation } from "react-query";
import PageLayout from "../../components/page-layout";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    margin: 60,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: "50px",
    width: "fit-content",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0px 200px",
  },
}));

interface Location {
  name: string;
  address: string;
  capacity: string;
  occupied: string;
}

export default function CreateLocationWizardPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [occupied, setOccupied] = useState("");

  const [createLocation] = useMutation((location: Location) => {
    return fetch("http://localhost:3001/locations", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
  });

  const handleChange = (event: any) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "capacity":
        setCapacity(event.target.value);
        break;
      case "occupied":
        setOccupied(event.target.value);
        break;
    }
  };

  function getSteps() {
    return [
      "Location details",
      "Capacity and Occupied space",
      "Review location data",
    ];
  }

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.stepContent}>
            <TextField
              id="name"
              label="Location name"
              value={name || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="address"
              label="Location address"
              value={address || ""}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 1:
        return (
          <div className={classes.stepContent}>
            <TextField
              id="capacity"
              label="Full capacity"
              value={capacity || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="occupied"
              label="Occupied space"
              value={occupied || ""}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 2:
        return (
          <div className={classes.stepContent}>
            <Typography>Location name: {name}</Typography>
            <Typography>Location address: {address}</Typography>
            <Typography>Location capacity: {capacity}</Typography>
            <Typography>Location occupied: {occupied}</Typography>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      await createLocation({ name, address, capacity, occupied } as Location);
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return name === "" || address === "";
    } else {
      return capacity === "" || occupied === "";
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setName("");
    setAddress("");
    setCapacity("");
    setOccupied("");
  };

  return (
    <PageLayout>
      <h1>Create new location</h1>
      <Paper className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.stepContainer}>
          {activeStep === steps.length ? (
            <>
              <Typography className={classes.instructions}>
                Location successfully created!
              </Typography>
              <Button onClick={handleReset}>Create new</Button>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className={classes.navButtonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                >
                  {activeStep === steps.length - 1 ? "Create location" : "Next"}
                </Button>
              </div>
            </>
          )}
        </div>
      </Paper>
    </PageLayout>
  );
}
