import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    margin: "10px"
  }
});
export const AddTimerDialog = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Input new Timer</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Repeat"
          inputProps={{
            type: "number",
            min: 1
          }}
          className={classes.root}
        />
        <br />
        <TextField
          variant="outlined"
          label="TimeLimit"
          inputProps={{ type: "number", min: 1 }}
          className={classes.root}
        />
        <br />
        <TextField
          variant="outlined"
          label="Power"
          inputProps={{ type: "number", min: 1 }}
          className={classes.root}
        />
        <br />
      </DialogContent>
    </Dialog>
  );
};
