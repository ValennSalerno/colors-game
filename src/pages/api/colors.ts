import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  readonly correctColor: string;
  readonly options: string[];
};

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const difficulty = (req.query.difficulty as string) || Difficulty.medium;

  const correctColor = generateRandomColor();

  const options = generateColorOptions(correctColor, difficulty);

  res.status(200).json({ correctColor: correctColor, options });
} 

function generateRandomColor(): string {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")
  );
}

function generateColorOptions(
  correctColor: string,
  difficulty: string
): string[] {
  const options = new Set<string>([correctColor]);

  const totalOptions =
    difficulty === Difficulty.easy ? 3 : difficulty === Difficulty.hard ? 6 : 4;

  while (options.size < totalOptions) {
    options.add(generateRandomColor());
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
}