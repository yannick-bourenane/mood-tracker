import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Collapse from "../components/tracker/Collapse";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";
import APIHandler from "../api/APIHandler";

const TrackMood = ({history}) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");
  const [tags, setTags] = useState([]);
  const [btnClicked, setClicked] = useState(false);

  const updateTags = (val) => {
    setTags(val)
  }

  useEffect(() => {
    setColorValue(changeBackground(sliderValue))
  })

  const sliderChange = e => {
    setSliderValue(+e.target.value)
  }

  const changeBackground = (range) => {
     return moodScale[range].bgColor
  }

  const handleClick = () => {
    setClicked(true);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newMood = {tags: tags, intensity: sliderValue}
    APIHandler.post("/daymood/new", newMood)
    .then(res => {
      // disable button once submitted ?
      history.push("/dashboard");
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="moodpage" style={{backgroundColor:"#fff"}}>
      <p className="date">{format(new Date(), "'Today is' PPPP")}</p>
      <h1>How are you feeling?</h1>
      <form className="form" onSubmit={handleSubmit}>
        <img className="emoji" src={moodScale[sliderValue].moodState} alt="mood"/>
        <div className="slidecontainer">
          <input
            type="range"
            min={0}
            max={10}
            value={sliderValue}
            onChange={sliderChange}
            className="slider"
          />
        </div>
        <Collapse 
          clbk={updateTags}
        />
        <button
          style={btnClicked ? {backgroundColor: "#fff", borderColor:colorValue} : {backgroundColor:colorValue}}
          className= "btn-ok"
          onClick={btnClicked ? undefined : handleClick}
          disabled={btnClicked}
        >
          {btnClicked ? "Saved !" : <FontAwesomeIcon icon={faCheck} />}
        </button>
      </form>
      
    </div>
  );
};

export default withRouter(TrackMood);
