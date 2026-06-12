function getBmi(height: number, weight: number): number {
  return weight / ((height/100) ** 2);
}

type BMI =
  | "Severe thinness"
  | "Moderate thinness"
  | "Mild thinness"
  | "Normal range"
  | "Overweight"
  | "Obese Class I"
  | "Obese Class II"
  | "Obese Class III";

function calculateBmi(height: number, weight: number): BMI {
  const bmi = getBmi(height, weight);
  if (bmi >= 40.0) {
    return "Obese Class III";
  } else if (bmi >= 35.0) {
    return "Obese Class II";
  } else if (bmi >= 30.0) {
    return "Obese Class I";
  } else if (bmi >= 25.0) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal range";
  } else if (bmi >= 17.0) {
    return "Mild thinness";
  } else if (bmi >= 16.0) {
    return "Moderate thinness";
  } else {
    return "Severe thinness";
  }
}

console.log(calculateBmi(180, 74));
