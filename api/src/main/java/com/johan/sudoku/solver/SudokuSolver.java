package com.johan.sudoku.solver;

import com.johan.sudoku.model.Board;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class SudokuSolver {
    private Board solved;
    private Board unsolved;
    private final int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

    private enum Difficulty {
        EASY, MEDIUM, HARD
    }

    private Difficulty difficulty;

    public SudokuSolver(Difficulty difficulty) {
        this.difficulty = difficulty;
        generatePuzzle();
    }

    public SudokuSolver() {
        this(Difficulty.EASY);
    }

    public void generatePuzzle() {
        solved = new Board();
        unsolved = new Board();
        shuffleNumbers();
        solved.getPuzzle()[0] = numbers;
        solve();
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                unsolved.getPuzzle()[row][col] = solved.getPuzzle()[row][col];
            }
        }
        makeUnsolved();
        printSolution();
    }

    private boolean solve() {
        int[] rowCol = new int[2];

        if (!findEmptyCell(rowCol))
            return true;

        int row = rowCol[0];
        int col = rowCol[1];

        for (int num = 1; num <= 9; num++) {
            if (isValidMove(row, col, num)) {
                solved.getPuzzle()[row][col] = num;

                if (solve())
                    return true;

                solved.getPuzzle()[row][col] = 0;
            }
        }
        return false;
    }

    private void makeUnsolved() {
        Random random = new Random();
        int numbersToRemove = 0;
        switch (difficulty) {
            case EASY:
                numbersToRemove = random.nextInt(40, 49);
                break;
            case MEDIUM:
                numbersToRemove = random.nextInt(50, 59);
                break;
            case HARD:
                numbersToRemove = random.nextInt(60, 70);
                break;
        }
        while (numbersToRemove > 0) {
            int row = random.nextInt(0, 9);
            int col = random.nextInt(0, 9);
            if (unsolved.getPuzzle()[row][col] != 0) {
                this.getUnsolved()[row][col] = 0;
                numbersToRemove--;
            }
        }
    }

    public void shuffleNumbers() {
        Random random = new Random();
        for (int i = 0; i < numbers.length; i++) {
            int randomIndex = random.nextInt(i, numbers.length);
            int temp = numbers[randomIndex];
            numbers[randomIndex] = numbers[i];
            numbers[i] = temp;
        }
    }

    private boolean findEmptyCell(int[] rowCol) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (solved.getPuzzle()[row][col] == 0) {
                    rowCol[0] = row;
                    rowCol[1] = col;
                    return true;
                }
            }
        }
        return false;
    }

    private boolean isValidMove(int row, int col, int num) {
        return !isNumberInRow(row, num) && !isNumberInColumn(col, num) && !isNumberInBox(row - row % 3, col - col % 3, num);
    }

    private boolean isNumberInRow(int row, int num) {
        for (int col = 0; col < 9; col++) {
            if (solved.getPuzzle()[row][col] == num)
                return true;
        }
        return false;
    }

    private boolean isNumberInColumn(int col, int num) {
        for (int row = 0; row < 9; row++) {
            if (solved.getPuzzle()[row][col] == num)
                return true;
        }
        return false;
    }

    private boolean isNumberInBox(int startRow, int startCol, int num) {
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                if (solved.getPuzzle()[startRow + row][startCol + col] == num)
                    return true;
            }
        }
        return false;
    }

    public void printSolution() {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                System.out.print(solved.getPuzzle()[row][col] + " ");
            }
            System.out.println();
        }
        System.out.println("==================");
    }

    public int[][] getUnsolved() {
        return unsolved.getPuzzle();
    }

    public boolean isOkayNumber(int row, int col, int num) {
        return solved.getPuzzle()[row][col] == num;
    }

    public boolean isComplete(int[][] userPuzzle) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (solved.getPuzzle()[row][col] != userPuzzle[row][col])
                    return false;
            }
        }
        return true;
    }
}
