import { useEffect, useState } from "react";
import { fetchPuzzle, checkCompletion } from "../services/sudokuService";
import useTimer from "./useTimer";

const useSudoku = () => {
  const [puzzle, setPuzzle] = useState(null);
  const { startTimer, stopTimer, formattedTime } = useTimer();
  const [isComplete, setComplete] = useState(false);

  const handleCellChange = (row, col, value) => {
    const updatedPuzzle = [...puzzle];
    updatedPuzzle[row][col].value = value;
    setPuzzle(updatedPuzzle);
  };

  const handlePlayAgain = () => {
    fetchData();
    startTimer();
  };

  const fetchData = async () => {
    const puzzle = await fetchPuzzle();
    setPuzzle(puzzle);
  };

  useEffect(() => {
    puzzle &&
      checkCompletion(puzzle).then((isComplete) => {
        isComplete && stopTimer();
        setComplete(isComplete);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    puzzle,
    isComplete,
    setPuzzle,
    fetchData,
    handleCellChange,
    handlePlayAgain,
    formattedTime,
  };
};

export default useSudoku;
