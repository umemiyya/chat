import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { stringSimilarity } from "string-similarity-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fungsi pencarian jawaban dengan kemiripan tertinggi
export function similarity(userQuestion: string, dataset: { question: string; answer: string }[]){
  let bestMatchIndex = 0;
  let highestScore = 0;

  dataset.forEach((item, index) => {
    const score = stringSimilarity(userQuestion, item.question); // nilai antara 0 - 1
    if (score > highestScore) {
      highestScore = score;
      bestMatchIndex = index;
    }
  });

  return {
    score: highestScore,
    question: dataset[bestMatchIndex].question,
    context: dataset[bestMatchIndex].answer
  };
}
