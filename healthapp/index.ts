import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { numCheck } from "./utils.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = numCheck(req.query.height);
    const weight = numCheck(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        error: "malformatted parameters",
      });
    } else {
      res.status(500).send({ error: "somthing went wrong" });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || target == undefined) {
    return res.status(400).send({ error: "parameters missing" });
  }
  const isnt_valid_daily_exercises =
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((days) => !isNaN(Number(days)));
  const isnt_vaild_target = isNaN(Number(target));
  if (isnt_valid_daily_exercises || isnt_vaild_target) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const exercises = daily_exercises.map((d) => Number(d));
  const targets = Number(target);
  const result = calculateExercises(exercises, targets);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
