import React from "react";
import {
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

const sty = { margin: "10px" };
export const AddTimerDialog = ({ isOpen, toggleIsOpen }) => {
  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle>Input new Timer</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Repeat"
          inputProps={{ type: "number", min: 1, defaultValue: 1 }}
          style={sty}
        />
        <br />
        <TextField
          variant="outlined"
          label="TimeLimit"
          inputProps={{ type: "number", min: 1, defaultValue: 1 }}
          style={sty}
        />
        <br />
        <TextField
          variant="outlined"
          label="Power"
          inputProps={{ type: "number", min: 1, defaultValue: 1 }}
          style={sty}
        />
        <br />
      </DialogContent>
    </Dialog>
  );
};
