import { Difficulty } from "@/pages/api/colors";
import { Colors } from "./colors";

const API_URL = process.env.API_URL || "http://localhost:3000";

export default async function Home({
  searchParams, //parametros del URL
}: {
  searchParams: { difficulty?: string };
}) {
  const difficulty = searchParams.difficulty || Difficulty.medium;
  const data = await fetch(`${API_URL}/api/colors?difficulty=${difficulty}`, {
    cache: "no-cache", //Evita la repetición de colores
  });

  const res = await data.json(); //paso lo que viene del servidor a objeto de JS

  return (
    <Colors
      correctColor={res.correctColor}
      options={res.options}
      selectedDifficulty={difficulty}
    /> //Genero componente y le envío 3 props
    //Componente generado porque se lo utilizará como use client
    //ya que será interactivo para el usuario
  );
}
