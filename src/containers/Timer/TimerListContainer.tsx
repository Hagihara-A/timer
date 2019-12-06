import { connect } from "react-redux";
import TimerList from "../../components/Timer/TimerList";

const mapStateToProps = state => {
  return {
    timers: state.get("timers")
  };
};

const TimerListContainer = connect(mapStateToProps)(TimerList);

export default TimerListContainer;
