import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { numCheck } from "./utils.ts";

const PORT = 3003;

const app = express();

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
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
