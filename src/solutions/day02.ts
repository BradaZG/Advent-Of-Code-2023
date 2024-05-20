import * as fs from "fs";

const input = "../inputs/day02.txt";
const inputTest = "../inputs/day02-t.txt";

type Cube = "red" | "blue" | "green";
type Draw = { count: number; cube: Cube };
type Set = Draw[];
type Game = { id: number; sets: Set[] };
type Data = Game[];

function parseInput(path: string): Data {
  return fs
    .readFileSync(path, "utf-8")
    .trimEnd()
    .split("\n")
    .map((line) => {
      const [first, second] = line.trim().split(":");

      const id = Number(first.split(" ")[1]);

      const sets = second.split(";").map((set) =>
        set.split(",").map((cubes) => {
          const [count, cube] = cubes.trim().split(" ");
          return { count: Number(count), cube };
        })
      );
      return { id, sets } as Game;
    });
}

// Part1

const part1 = (data: Data) =>
  data
    .filter((game) =>
      game.sets.flat().every((cubes) => {
        if (cubes.cube === "red" && cubes.count > 12) return false;
        if (cubes.cube === "green" && cubes.count > 13) return false;
        if (cubes.cube === "blue" && cubes.count > 14) return false;
        return true;
      })
    )
    .reduce((sum, currGame) => sum + currGame.id, 0);

console.log(part1(parseInput(input)));

// Part2

const part2 = (data: Data): number =>
  data
    .map((game) => {
      const draws = game.sets.flat().sort((a, b) => b.count - a.count);
      const minRed = draws.filter((draw) => draw.cube === "red")[0].count;
      const minGreen = draws.filter((draw) => draw.cube === "green")[0].count;
      const minBlue = draws.filter((draw) => draw.cube === "blue")[0].count;

      return minRed * minGreen * minBlue;
    })
    .reduce((prev, curr) => prev + curr, 0);

console.log(part2(parseInput(input)));
