import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { finishTimer } from "../../../actions";

const SkipButtonInner = ({ skip }) => {
  const handleClick = e => {
    e.preventDefault();
    skip();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      SKIP
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  skip: () => dispatch(finishTimer())
});

const SkipButton = connect(null, mapDispatchToProps)(SkipButtonInner);
export default SkipButton;
