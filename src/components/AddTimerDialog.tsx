import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { EditableTimerData } from "../types";
const useStyles = makeStyles({
  root: {
    margin: "10px",
  },
});
export const AddTimerDialog = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (timeLimit: number, power: number) => void;
}) => {
  const classes = useStyles();
  const [timeLimit, setTimeLimit] = useState(0);
  const [power, setPower] = useState(0);

  const onClickOK = () => {
    if (timeLimit > 0 && power > 0) {
      onSubmit(timeLimit, power);
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Input new Timer</DialogTitle>
      <DialogContent>
        <TextField
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          variant="outlined"
          label="TimeLimit"
          inputProps={{ type: "number", min: 1 }}
          className={classes.root}
        />
        <br />
        <TextField
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          variant="outlined"
          label="Power"
          inputProps={{ type: "number", min: 1 }}
          className={classes.root}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickOK}>OK!</Button>
      </DialogActions>
    </Dialog>
  );
};
