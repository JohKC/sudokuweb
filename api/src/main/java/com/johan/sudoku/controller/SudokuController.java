package com.johan.sudoku.controller;

import com.johan.sudoku.model.Board;
import com.johan.sudoku.solver.SudokuSolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/sudoku")
public class SudokuController {
    private final SudokuSolver solver;

    @Autowired
    public SudokuController(SudokuSolver solver) {
        this.solver = solver;
    }

    @GetMapping
    public ResponseEntity<Map<String, int[][]>> getUnsolved() {
        solver.generatePuzzle();
        int[][] unsolved = solver.getUnsolved();
        Map<String, int[][]> response = new HashMap<>();
        response.put("unsolved", unsolved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/checkvaluevalidity")
    public ResponseEntity<Map<String, Boolean>> checkValueValidity(@RequestParam("row") int row, @RequestParam("col") int col, @RequestParam("value") int value) {
        boolean isValid = solver.isOkayNumber(row, col, value);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkcompletion")
    public ResponseEntity<Map<String, Boolean>> checkCompletion(@RequestBody Board board) {
        boolean isComplete = solver.isComplete(board.getPuzzle());
        Map<String, Boolean> response = new HashMap<>();
        response.put("isComplete", isComplete);
        return ResponseEntity.ok(response);
    }
}
