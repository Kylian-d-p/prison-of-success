"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Character1 from "../components/characters/character1";
import Character2 from "../components/characters/character2";

export default function Play() {
  const [choiceIndex, setChoiceIndex] = useState(0);
  const mailContentRef = useRef<HTMLParagraphElement>(null);
  const letterContentRef = useRef<HTMLParagraphElement>(null);

  const [endings, setEndings] = useState({
    whistleblower: { label: "", points: 0 },
    systemPuppet: { label: "", points: 0 },
    powerArchitect: { label: "", points: 0 },
    fall: { label: "", points: 0 },
  });

  const [responsesSettings, setResponsesSettings] = useState<(string | null)[]>([]);

  type EndingPoints = { [K in keyof typeof endings]?: number };

  type Option = {
    label: string;
    endingPoints: EndingPoints;
    setting?: string;
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
        label: "Choisirez-vous la voie de l'honnêteté ?",
        options: [
          {
            label: "Annoncer les mauvais résultats et perdre en valeur sur le marché",
            endingPoints: { whistleblower: 1, fall: 1 },
          },
          {
            label: "Falsifier et manipuler les chiffres en votre faveur",
            endingPoints: { systemPuppet: 1, powerArchitect: 1 },
          },
        ],
        support: {
          type: "discussion",
          characterId: 2,
          text: "Les résultats de l’entreprise ne sont pas ceux promis aux investisseurs. Il faut que tu trouves une solution !",
        },
      },
      {
        label: "Comment allez-vous réagir aux soupçons de fraude interne ?",
        options: [
          {
            label: "Enquêter discrètement",
            endingPoints: { whistleblower: 2 },
            setting: "investigate",
          },
          {
            label: "Dénoncer publiquement la situation",
            endingPoints: { whistleblower: 3, fall: 1 },
            setting: "expose",
          },
          {
            label: "Couvrir l'affaire pour protéger votre position",
            endingPoints: { systemPuppet: 2 },
            setting: "coverup",
          },
        ],
        support: {
          type: "mail",
          subject: "Problèmes internes",
          from: "anonyme@securemail.com",
          content: `<p>Bonjour,</p>
            <p>Il y a des preuves que des pratiques illégales ont lieu au sein de DataCorp.</p>
            <p>Nous comptons sur vous pour agir.</p>
            <br />
            <p>- Un lanceur d’alerte</p>`,
        },
      },
      responsesSettings.at(1) === "investigate"
        ? {
            label: "Votre enquête révèle des pratiques encore plus douteuses. Que faites-vous ?",
            options: [
              {
                label: "Prendre des preuves et contacter la presse",
                endingPoints: { whistleblower: 3, fall: 2 },
                setting: "press",
              },
              {
                label: "Monnayer votre silence pour obtenir une promotion",
                endingPoints: { powerArchitect: 2, systemPuppet: 2 },
                setting: "bribe",
              },
              {
                label: "Fuir le pays avec les informations pour votre sécurité",
                endingPoints: { whistleblower: 2, fall: 1 },
                setting: "flee",
              },
            ],
            support: {
              type: "letter",
              content: `<p>Bonjour,</p><br/><p>Suite à votre demande d'enquête, nous avons trouvé des preuves compromettantes sur la gestion interne.</p><br/>
          <p>Le choix est entre vos mains.</p>`,
            },
          }
        : responsesSettings.at(1) === "expose"
        ? {
            label: "Comment allez-vous gérer la pression médiatique ?",
            options: [
              {
                label: "Coopérer avec les journalistes et révéler les preuves",
                endingPoints: { whistleblower: 3 },
                setting: "cooperate",
              },
              {
                label: "Quitter l'entreprise pour éviter les conséquences",
                endingPoints: { fall: 1 },
                setting: "quit",
              },
            ],
            support: {
              type: "mail",
              from: "presse@journal.com",
              subject: "Interview exclusive",
              content: `<p>Bonjour,</p>
                <p>Suite à vos récentes révélations, nous souhaitons vous interviewer afin de mieux comprendre la situation et que le grand publique fasse la rencontre du lanceur d'alerte.</p>
                <p>Quand êtes-vous disponible ?</p>`,
            },
          }
        : {
            label: "Qui souhaitez-vous licencier ?",
            options: [
              {
                label: "Julien, le vétéran de l'entreprise qui occupe un poste clé pour lequel vous souhaitez être promu",
                endingPoints: { powerArchitect: 2 },
              },
              {
                label: "Marie, la jeune recrue qui a des compétences similaires à vous",
                endingPoints: { powerArchitect: 1 },
              },
              {
                label: "Aucun des deux, il faut arrêter les séminaires à l'étranger tous les 2 mois",
                endingPoints: { whistleblower: 1 },
              },
            ],
            support: {
              type: "discussion",
              characterId: 2,
              text: "Hey, on a besoin de réduire les dépenses de l'entreprise. On aimerait recueillir ton avis sur les licenciements.",
            },
          },
    ],
    [responsesSettings]
  );

  const completeChoice = (endingPoints: EndingPoints, setting?: string) => () => {
    setResponsesSettings((prev) => [...prev, setting || null]);
    setEndings((prev) => {
      const newEndings = { ...prev };
      for (const key in endingPoints) {
        const typedKey = key as keyof typeof endings;
        newEndings[typedKey].points += endingPoints[typedKey] || 0;
      }
      return newEndings;
    });
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
        <div className="p-2 rounded-2xl bg-white text-black text-2xl max-w-lg self-end relative">
          <Image alt="" src="/stamp.png" width={50} height={50} className="absolute top-2 right-2" />
          <p ref={letterContentRef}></p>
        </div>
      )}
      {choices[choiceIndex].support.type === "discussion" && (
        <div className="fixed w-[300px] h-[700px] bottom-0 right-5 translate-y-1/4">
          <div className="bg-white text-black fixed top-0 right-1/2 -translate-y-full p-2 w-60 rounded-lg rounded-br-none text-2xl">
            <p>{choices[choiceIndex].support.text}</p>
          </div>
          <Character2 className="absolute -scale-x-100 -z-10" />
        </div>
      )}
      <div className="bg-white text-black rounded-xl p-4 text-3xl flex flex-col gap-2 z-10">
        {choices[choiceIndex].label && <p className="select-none">{choices[choiceIndex].label}</p>}
        <div className="flex flex-col items-center gap-2">
          {choices[choiceIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={completeChoice(option.endingPoints, option.setting)}
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
