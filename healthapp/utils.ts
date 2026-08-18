

const isNotNumber = (num: unknown): boolean=>{
    const numTrimmed = String(num).trim();
    const numConverted = Number(numTrimmed);
    return (isNaN(numConverted) || String(numConverted)!= numTrimmed);
};

export const numCheck = (num:unknown) => {
  if (isNotNumber(num)){
      throw Error(`${num} is not a number`);
    }
    return Number(num);
};