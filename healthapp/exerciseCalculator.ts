import { numCheck } from "./utils.ts";

interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type RatingMsg =
  | "needs to improve"
  | "not too bad but could be better"
  | "very nice";

function calculateExercises(
  exerciseHours: number[],
  target: number,
): ExerciseData {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length;
  const totalHours = exerciseHours.reduce((s, a) => s + a, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  const success = average >= target;
  const rating = 1 + Math.floor((trainingDays / periodLength) * 2);
  let ratingDescription: RatingMsg;
  switch (rating) {
    case 1:
      ratingDescription = "needs to improve";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    default:
      ratingDescription = "very nice";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}



try {
  if (process.argv.length < 4) {
    throw Error("invalid number of inputs");
  }
  const target: number = numCheck(process.argv[2]);
  const exerciseHours: number[] = process.argv.slice(3).map((h) => numCheck(h));
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
