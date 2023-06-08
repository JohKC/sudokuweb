import useSudoku from "../hooks/useSudoku";
import Box from "./Box";
import Cell from "./Cell";

const Board = () => {
  const {
    puzzle,
    isComplete,
    handleCellChange,
    handlePlayAgain,
    formattedTime,
  } = useSudoku();

  function fillBox(startRow, startCol) {
    return [...Array(3)].map((_, row) => {
      return [...Array(3)].map((_, col) => (
        <Cell
          key={row + "," + col}
          cell={puzzle[startRow + row][startCol + col]}
          row={startRow + row}
          col={startCol + col}
          onChange={(value) =>
            handleCellChange(startRow + row, startCol + col, value)
          }
        />
      ));
    });
  }

  return (
    <>
      <small style={{ color: "#c0b7b1", fontSize: "1.2rem" }}>
        {formattedTime}
      </small>
      {puzzle && (
        <div
          style={{
            background: "#433e3f",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 5,
            padding: 5,
          }}>
          {[0, 3, 6].map((row) =>
            [0, 3, 6].map((col) => (
              <Box key={`${row},${col}`}>{fillBox(row, col)}</Box>
            ))
          )}
          {isComplete && (
            <div
              onClick={handlePlayAgain}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                color: "#433e3f",
              }}>
              <h2>You finished! :)</h2>
              <span>Click this area to play again.</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Board;
