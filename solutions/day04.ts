import * as fs from "fs";

const input = "../inputs/day04.txt";
const inputTest = "../inputs/day04-t1.txt";

type Card = { myNumbers: number[]; winningNumbers: number[] };

function parseInput(path: string): Card[] {
  try {
    return fs
      .readFileSync(path, "utf-8")
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [_, second] = line.trim().split(":");

        const numbers = second.trim().split("|");
        const myNumbers = numbers[0]
          .trim()
          .split(" ")
          .filter((char) => char !== "")
          .map(Number);
        const winningNumbers = numbers[1]
          .trim()
          .split(" ")
          .filter((char) => char !== "")
          .map(Number);
        return { myNumbers, winningNumbers };
      });
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    return [];
  }
}

const part1 = (data: Card[]) => {
  let count = 0;
  const winArr: number[] = [];
  let total = 0;

  data.map((card) => {
    card.myNumbers.map((num) => {
      if (card.winningNumbers.includes(num)) {
        count++;
      }
    });
    winArr.push(count);
    count = 0;
  });

  for (let i = 0; i < winArr.length; i++) {
    let res = 0;
    for (let j = 0; j < winArr[i]; j++) {
      if (j === 0) res = 1;
      else {
        res *= 2;
      }
    }
    total += res;
  }

  return total;
};

console.log(part1(parseInput(input)));
