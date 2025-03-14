"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function End() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [generating, setGenerating] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const hasFetched = useRef(false); // Référence pour garder une trace de si la requête a déjà été effectuée

  useEffect(() => {
    if (hasFetched.current) return; // Si la requête a déjà été effectuée, on ne fait rien
    hasFetched.current = true; // On marque que la requête a été effectuée

    const generate = async () => {
      const generationRes = await fetch("/api/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choicesHistory: localStorage.getItem("choicesHistory") || "" }),
      });

      if (generationRes.ok && generationRes.body && textRef.current) {
        const reader = generationRes.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let buffer: string | undefined = "";
        textRef.current.innerText = "";
        setInitializing(false);

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
                line = line.replace("data: ", "");
                try {
                  JSON.parse(line);
                } catch {
                  return;
                }
                spanElement.classList.add("opacity-0");
                spanElement.classList.add("transition-opacity");
                spanElement.innerText = JSON.parse(line).choices[0].delta.content;
                textRef.current.appendChild(spanElement);
                setTimeout(() => {
                  spanElement.classList.remove("opacity-0");
                }, 100);
              }
            });
          }
        }
      }
      setGenerating(false);
    };

    generate();
  }, []);

  return (
    <div className="bg-[#ff9eb1c0] flex flex-col gap-2 backdrop-blur-xs shadow-[0_0_0_2px_#d07c8d] text-white text-bordered fixed top-5 left-6 right-5 bottom-5 rounded-xl p-4 text-3xl overflow-y-auto">
      <h1 className="text-center text-6xl py-5">FIN</h1>
      {initializing && (
        <div className="flex flex-col items-center gap-2">
          <p>Génération de votre fin personnalisée...</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}
      <p ref={textRef}></p>
      {!generating && (
        <Link href={"/"} className="self-center">
          <button className="py-2 px-5 bg-[#f37070] text-bordered-2 rounded-xl transition-colors cursor-pointer font-medium">Recommencer</button>
        </Link>
      )}
    </div>
  );
}