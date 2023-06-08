import { useState, useEffect } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000); // update every second

    setIntervalId(timerInterval);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const startTimer = () => {
    clearInterval(intervalId);
    setTime(0);

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setIntervalId(timerInterval);
  };

  const stopTimer = () => {
    console.log("timer stopped");
    clearInterval(intervalId);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return {
    time,
    formattedTime: formatTime(time),
    startTimer,
    stopTimer,
  };
};

export default useTimer;
