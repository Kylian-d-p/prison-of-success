"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Character1 from "./components/characters/character1";
import Character2 from "./components/characters/character2";

export default function Home() {
  const [introTexts] = useState([
    "Joel Ladrat - Bienvenue chez DataCorp, un géant de l'industrie, une machine bien huilée où chaque rouage doit tourner sans faillir. Ton rôle ? Atteindre les objectifs fixés par la direction. Peu importe le moyen",
  ]);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (textIndex === introTexts.length - 1) {
        redirect("/play");
      }
      setTextIndex((prev) => prev + 1);
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [textIndex, introTexts]);

  return (
    <main>
      <Character1 className="fixed w-[256px] h-[512px] bottom-0 left-5 translate-y-1/4" />
      <Character2 className="fixed w-[256px] h-[512px] bottom-0 right-5 translate-y-1/4 -scale-x-100" />
      <div className="bg-white text-black fixed bottom-5 left-6 right-5 rounded-xl p-4 text-3xl">
        <p className="select-none">{introTexts[textIndex]}</p>
      </div>
    </main>
  );
}
