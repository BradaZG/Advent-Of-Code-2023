import * as fs from "fs";

const input = "../inputs/day01.txt";
const inputTest1 = "../inputs/day01-t1.txt";
const inputTest2 = "../inputs/day01-t2.txt";

type Data = string[];

function parseInput(path: string): Data {
  return fs.readFileSync(path, "utf-8").trimEnd().split("\n");
}

// Part1

const filterNumbers = (str: string): string[] =>
  str.replace(/\D/g, "").split("");

const part1 = (data: Data): number =>
  data
    .map((line): number => {
      const nums = filterNumbers(line);
      return Number(nums[0] + nums[nums.length - 1]);
    })
    .reduce((curr, prev) => curr + prev, 0);

console.log(part1(parseInput(input)));

// Part2

function wordToDigit(word: string): string {
  const wordMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
  };
  return wordMap[word] !== undefined ? wordMap[word] : word;
}

const replaceWords = (str: string): string[] => {
  const numRegex = /one|two|three|four|five|six|seven|eight|nine|\d/g;

  let index = 0;
  let numbers: string[] = [];

  while (index < str.length) {
    numRegex.lastIndex = index; // Set the starting point for the next match
    let matches = numRegex.exec(str);

    if (!matches) {
      break;
    }

    numbers.push(wordToDigit(matches[0])); // Convert the word to a digit and add to the array
    index = matches.index + 1;
  }

  return numbers;
};

const part2 = (data: Data): number => {
  return data
    .map((line) => replaceWords(line))
    .map((line) => Number(line[0] + line[line.length - 1]))
    .reduce((curr, prev) => curr + prev, 0);
};

console.log(part2(parseInput(input)));
