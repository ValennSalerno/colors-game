import { Difficulty } from "@/app/pages/api/colors";
import { Colors } from "./colors";

const API_URL = process.env.API_URL || "http://localhost:3001";

export default async function Home({
  searchParams,
}: {
  searchParams: { difficulty?: string };
}) {
  const difficulty = searchParams.difficulty || Difficulty.medium;
  const data = await fetch(`${API_URL}/api/colors?difficulty=${difficulty}`, {
    cache: "no-cache",
  });

  const res = await data.json();

  return (
    <Colors
      correctColor={res.correctColor}
      options={res.options}
      selectedDifficulty={difficulty}
    />
  );
}
