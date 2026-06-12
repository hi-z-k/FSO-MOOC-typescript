interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type rating = "needs to improve" | "not too bad but could be better" | "very nice";

function calculateExercises(
  exerciseHours: number[],
  target: number,
): ExerciseData {
  let result: ExerciseData;
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length;
  const totalHours = exerciseHours.reduce((s, a) => s + a, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  const success = average >= target;
  const rating = 1 + Math.floor((trainingDays / periodLength) * 2);
  let ratingDescription: rating;
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

const report = calculateExercises([3, 0, 2, 4, 0, 1, 5], 2);
console.log(report);
