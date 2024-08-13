"use client";

import { Difficulty } from "@/app/pages/api/colors";
import { useState } from "react";

interface ColorsProps {
  readonly correctColor: string;
  readonly options: string[];
  readonly selectedDifficulty: string;
}

export function Colors({
  correctColor,
  options,
  selectedDifficulty,
}: ColorsProps) {
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (option === correctColor) {
      alert("Correcto!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("Incorrecto");
      setDisabledOptions((prev) => [...prev, option]);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-2xl mt-5">Find the right color: {correctColor}</h1>

      <div className="flex gap-5 my-5">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              if (!disabledOptions.includes(option)) {
                handleOptionClick(option);
              }
            }}
            className="w-28 h-28"
            style={{
              backgroundColor: option,
              cursor: disabledOptions.includes(option)
                ? "not-allowed"
                : "pointer",
              opacity: disabledOptions.includes(option) ? 0.3 : 1,
            }}
          />
        ))}
      </div>

      <div>
        <label>Difficulty: </label>
        <select
          onChange={(e) => {
            const selectedDifficulty = e.target.value;
            window.location.search = `?difficulty=${selectedDifficulty}`;
          }}
          className="capitalize"
          defaultValue={selectedDifficulty}
        >
          <option value={Difficulty.easy}>{Difficulty.easy}</option>
          <option value={Difficulty.medium}>{Difficulty.medium}</option>
          <option value={Difficulty.hard}>{Difficulty.hard}</option>
        </select>
      </div>
    </div>
  );
}
