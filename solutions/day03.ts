import * as fs from "fs";

const input = "../inputs/day03.txt";
const inputTest = "../inputs/day03-t1.txt";

type Data = string[];

function parseInput(path: string): Data[] {
  return fs
    .readFileSync(path, "utf-8")
    .trimEnd()
    .split("\n")
    .map((line) => line.split(""));
}

function checkAdjacentForSymbols(grid: Data[], i: number, j: number): boolean {
  const symbolRegex = /[^\w.]/;

  // Check all 8 surrounding cells
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue; // Skip the cell itself

      const checkI = i + x;
      const checkJ = j + y;

      // Boundary checks
      if (
        checkI >= 0 &&
        checkI < grid.length &&
        checkJ >= 0 &&
        checkJ < grid[checkI].length
      ) {
        if (symbolRegex.test(grid[checkI][checkJ])) {
          return true;
        }
      }
    }
  }

  return false;
}

const part1 = (data: Data[]): number => {
  const valueArr: number[] = [];
  let value = "";
  let symbolArr: boolean[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (/\d/.test(data[i][j])) {
        value += data[i][j];

        // Check adjacent cells for symbols
        const isAdjacentToSymbol = checkAdjacentForSymbols(data, i, j);
        symbolArr.push(isAdjacentToSymbol);
      } else {
        if (value && symbolArr.some((val) => val === true))
          valueArr.push(Number(value));
        value = "";
        symbolArr = [];
      }
    }
  }

  return valueArr.reduce((prev, curr) => prev + curr, 0);
};

console.log(part1(parseInput(input)));
