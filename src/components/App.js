import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  // Store time in centiseconds (1/100th of a second) as a number
  const [time, setTime] = useState(0); 
  const [start, setStart] = useState(false);
  const [laps, setLaps] = useState([]);

  // Helper function to format time as "MM:SS:CC"
  const formatTime = () => {
    const getCentiseconds = `0${time % 100}`.slice(-2);
    const totalSeconds = Math.floor(time / 100);
    const getSeconds = `0${totalSeconds % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(totalSeconds / 60)}`.slice(-2);

    return `${getMinutes}:${getSeconds}:${getCentiseconds}`;
  };

  useEffect(() => {
    let interval = null;

    if (start) {
      // If start is true, increment time every 10 milliseconds (1 centisecond)
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else {
      // If start is false, clear the interval
      clearInterval(interval);
    }

    // Cleanup function to clear interval when component unmounts or deps change
    return () => clearInterval(interval);
  }, [start]);

  function handleStart() {
    setStart(true);
  }

  function handleStop() {
    setStart(false);
  }

  function handleLap() {
    // Add the currently formatted string to the laps array
    setLaps([...laps, formatTime()]);
  }

  function handleReset() {
    setStart(false);
    setTime(0);
    setLaps([]);
  }

  const showLaps = laps.map((lap, index) => {
    // Added 'key' prop which is required for React lists
    return <li key={index}>{lap}</li>;
  });

  return (
    <div>
        {/* We call formatTime() here to display the string */}
        <p className="timer">{formatTime()}</p>
        <button className="start" onClick={handleStart}>Start</button>
        <button className="stop" onClick={handleStop}>Stop</button>
        <button className="laps" onClick={handleLap}>Lap</button>
        <button className="reset" onClick={handleReset}>Reset</button>
        <ul>
          {showLaps}
        </ul>
    </div>
  );
}

export default App;