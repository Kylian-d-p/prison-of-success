"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Character1 from "../components/characters/character1";
import Character2 from "../components/characters/character2";

export default function Play() {
  const [choiceIndex, setChoiceIndex] = useState(0);
  const mailContentRef = useRef<HTMLParagraphElement>(null);
  const letterContentRef = useRef<HTMLParagraphElement>(null);

  const endings = {
    whistleblower: "",
    systemPuppet: "",
    powerArchitect: "",
    fall: "",
  };

  type EndingPoints = { [K in keyof typeof endings]?: number };

  type Option = {
    label: string;
    endingPoints: EndingPoints;
  };

  type Support =
    | { type: "mail"; subject: string; from: string; content: string }
    | { type: "letter"; content: string }
    | { type: "discussion"; characterId: 2 | 3; text: string };

  type Choice = {
    label?: string;
    options: Option[];
    support: Support;
  };

  const choices: Choice[] = useMemo(
    () => [
      {
        options: [
          {
            label: "Accepter l'offre et falsifier les rapports",
            endingPoints: { whistleblower: 0, systemPuppet: -1, powerArchitect: 0, fall: 0 },
          },
          {
            label: "Refuser l'offre, mais ne pas dénoncer",
            endingPoints: { whistleblower: 0, systemPuppet: 1, powerArchitect: 0, fall: 0 },
          },
          {
            label: "Refuser et dénoncer l'offre",
            endingPoints: { whistleblower: 1, systemPuppet: 2, powerArchitect: 0, fall: 0 },
          },
        ],
        support: {
          type: "mail",
          subject: "Salut !",
          from: "coucou@emiel.com",
          content: `<p>Bonjour,</p>
        <p>Je t'envoie ce mail pour te dire que tu as une mission à accomplir.</p>`,
        },
      },
      {
        label: "Quoi lui répondre ?",
        options: [
          {
            label: "Oui, j'ai bien reçu le mail",
            endingPoints: { whistleblower: 0, systemPuppet: 0, powerArchitect: 0, fall: 0 },
          },
          {
            label: "Non, je n'ai pas reçu le mail",
            endingPoints: { whistleblower: 0, systemPuppet: 0, powerArchitect: 0, fall: 0 },
          },
        ],
        support: {
          type: "discussion",
          characterId: 2,
          text: "Tu as bien reçu le mail ?",
        },
      },
    ],
    []
  );

  const completeChoice = (endingPoints: EndingPoints) => () => {
    setChoiceIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!mailContentRef.current) return;

    if (choices[choiceIndex].support.type === "mail") mailContentRef.current.innerHTML = choices[choiceIndex].support.content;
  }, [choiceIndex, choices]);

  useEffect(() => {
    if (!letterContentRef.current) return;

    if (choices[choiceIndex].support.type === "letter") letterContentRef.current.innerHTML = choices[choiceIndex].support.content;
  }, [choiceIndex, choices]);

  return (
    <main className="flex flex-col justify-end gap-5 h-screen p-5">
      <Character1 className="fixed w-[300px] h-[700px] bottom-0 left-5 translate-y-1/4 -z-10" />
      {choices[choiceIndex].support.type === "mail" && (
        <div className="p-2 rounded-2xl bg-white text-black text-2xl max-w-lg self-end">
          <p>De : {choices[choiceIndex].support.from}</p>
          <p>Objet : {choices[choiceIndex].support.subject}</p>
          <br />
          <p ref={mailContentRef}></p>
        </div>
      )}
      {choices[choiceIndex].support.type === "letter" && (
        <div className="p-2 rounded-2xl bg-white text-black text-2xl max-w-lg self-end">
          <p ref={letterContentRef}></p>
        </div>
      )}
      {choices[choiceIndex].support.type === "discussion" && (
        <div className="fixed w-[300px] h-[700px] bottom-0 right-5 translate-y-1/4">
          <div className="bg-white text-black fixed top-0 right-1/2 -translate-y-full p-2 w-60 rounded-lg rounded-br-none text-2xl">
            <p>{choices[choiceIndex].support.text}</p>
          </div>
          <Character2 className="absolute -scale-x-100" />
        </div>
      )}
      <div className="bg-white text-black rounded-xl p-4 text-3xl flex flex-col gap-2">
        {choices[choiceIndex].label && <p className="select-none">{choices[choiceIndex].label}</p>}
        <div className="flex flex-col items-center gap-2">
          {choices[choiceIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={completeChoice(option.endingPoints)}
              className="p-2 bg-stone-200 hover:bg-stone-300 rounded-xl w-full transition-colors cursor-pointer"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
