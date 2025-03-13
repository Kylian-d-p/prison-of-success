"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function End() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const generate = async () => {
      const generationRes = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_API}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stream: true,
          model: "llama3.1:latest",
          prompt: `Ton but va être de déterminer la personnalité d'un joueur à partir de ses prises de décisions dans l'environnement d'une entreprise, DataCorp.
      Tu dois retourner un texte qui décrit le joueur et ses choix, s'ils sont moraux ou non. Tu dois également écrire une très courte suite à l'histoire.
      N'utilises pas de mise en forme spécifique, juste du texte brut.
      Tu t'adresses directement au joueur.
      Le texte doit être concis et clair.
      Le premier paragraphe doit conclure l'histoire du joueur en mettant un terme à tout suspense.
      Le deuxième paragraphe doit décrire le joueur, ses choix et sa personnalité, en commençant par "Vous êtes un joueur...".
      Et enfin une phrase de remerciement.
      Le joueur a été soumis a plusieurs dilemmes moraux et voici la liste de ses choix :\n
      ${localStorage.getItem("choicesHistory")}`,
        }),
      });

      if (generationRes.ok && generationRes.body && textRef.current) {
        if (!isMounted) return;
        const reader = generationRes.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let buffer: string | undefined = "";
        textRef.current.innerText = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          buffer += decoder.decode(value, { stream: true });

          if (buffer) {
            const lines: string[] = buffer.split("\n");
            buffer = lines.pop();

            lines.forEach((line) => {
              if (line.trim() && textRef.current) {
                const spanElement = document.createElement("span");
                spanElement.innerText = JSON.parse(line).response;
                textRef.current.appendChild(spanElement);
              }
            });
          }
        }
        setGenerating(false);
      } else {
        alert("Aïe... Il y a eu une erreur.");
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-[#ff9eb1c0] flex flex-col gap-2 backdrop-blur-xs shadow-[0_0_0_2px_#d07c8d] text-white text-bordered fixed top-5 left-6 right-5 bottom-5 rounded-xl p-4 text-3xl overflow-y-auto">
      <p ref={textRef}></p>
      {!generating && (
        <Link href={"/"} className="self-center">
          <button className="py-2 px-5 bg-[#f37070] text-bordered-2 rounded-xl transition-colors cursor-pointer font-medium">Recommencer</button>
        </Link>
      )}
    </div>
  );
}
