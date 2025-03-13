"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Character1 from "./components/characters/character1";
import Character2 from "./components/characters/character2";

export default function Home() {
  const [introTexts] = useState([
    "Joel Ladrat - Ici on est chez DataCorp, l’information est notre plus grande richesse.",
    "En rejoignant nos rangs, vous faites désormais partie d’une élite. Votre mission est simple : analyser, anticiper et optimiser.",
    "DataCorp doit être prospère. Chaque décision que vous prendrez aura un impact réel, chaque choix définira votre avenir au sein de DataCorp.",
    "Nous récompensons l’efficacité. Nous valorisons l’ambition. Et surtout, nous n’avons aucune place pour l’échec.",
    "D'ailleurs, je viens de recevoir votre premier dossier à traiter. Je vous laisse, j'ai un rendez-vous important.",
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
      <Character1 className="fixed w-[300px] h-[700px] bottom-0 left-5 translate-y-1/4" />
      <Character2 className="fixed w-[300px] h-[700px] bottom-0 right-5 translate-y-1/4 -scale-x-100" />
      <div className="bg-[#ff9eb1c0] backdrop-blur-xs shadow-[0_0_0_2px_#d07c8d] text-white text-bordered fixed bottom-5 left-6 right-5 rounded-xl p-4 text-3xl">
        <p className="select-none">{introTexts[textIndex]}</p>
      </div>
    </main>
  );
}
