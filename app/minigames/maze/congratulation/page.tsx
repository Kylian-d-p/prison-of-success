"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Character2 from "@/app/components/characters/character2";
export default function Home() {
  const [introTexts] = useState([
    "Félicitations, vous vous êtes enfuis. Vous avez réussi à vous échapper.",
  ]);
  const [textIndex, setTextIndex] = useState(0);

  const clickHandler = () => {
    if (textIndex === introTexts.length - 1) {
      localStorage.clear();
      redirect("/play");
    }
    setTextIndex((prev) => prev + 1);
  };

  return (
    <main>
      <div className="fixed z-40 top-0 left-0 right-0 bottom-0" onClick={clickHandler} />
      {
      <Character2 className="fixed w-[300px] h-[700px] bottom-0 right-5 translate-y-1/4 -scale-x-100" /> }
      <div className="bg-[#ff9eb1c0] backdrop-blur-xs shadow-[0_0_0_2px_#d07c8d] text-white text-bordered fixed bottom-5 left-6 right-5 rounded-xl p-4 text-6xl text-center">
        <p className="select-none">{introTexts[textIndex]}</p>
      </div>
    </main>
  );
}
