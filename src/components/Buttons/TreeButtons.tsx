import { IconButton, makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";

const useIconStyles = makeStyles({
  root: {
    fontSize: "5rem",
  },
});

export const TreeButtons = ({
  onClickAdd,
  onClickComplete,
}: {
  onClickAdd: () => void;
  onClickComplete: () => void;
}) => {
  const classes = useIconStyles();
  return (
    <div>
      <IconButton onClick={onClickAdd}>
        <AddCircleIcon className={classes.root} color="primary" />
      </IconButton>
      <IconButton onClick={onClickComplete}>
        <CheckCircleIcon className={classes.root} color="primary" />
      </IconButton>
    </div>
  );
};
