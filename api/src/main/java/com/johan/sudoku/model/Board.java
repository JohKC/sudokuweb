package com.johan.sudoku.model;

import lombok.Getter;

public class Board {

    @Getter
    private final int[][] puzzle;

    public Board() {
        this.puzzle = new int[9][9];
    }
}
