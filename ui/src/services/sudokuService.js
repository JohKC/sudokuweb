import { constants } from "../../constants";

export const fetchPuzzle = async () => {
  const { API_URL } = constants;
  const res = await fetch(API_URL);
  const { unsolved } = await res.json();
  const puzzle = unsolved.map((row) =>
    row.map((col) => ({
      value: col > 0 ? col : "",
      readOnly: col > 0,
    }))
  );
  return puzzle;
};

export const checkCompletion = async (puzzle) => {
  const { API_URL } = constants;
  const res = await fetch(`${API_URL}/checkcompletion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      puzzle: puzzle.map((row) =>
        row.map((cell) => (cell.value === "" ? 0 : parseInt(cell.value)))
      ),
    }),
  });
  const { isComplete } = await res.json();
  return isComplete;
};

export const checkValueValidity = async (row, col, value) => {
  const { API_URL } = constants;
  const res = await fetch(
    `${API_URL}/checkvaluevalidity?row=${row}&col=${col}&value=${value}`
  );
  const { isValid } = await res.json();
  return isValid;
};
