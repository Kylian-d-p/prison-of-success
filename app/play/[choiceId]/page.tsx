"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useRef, useState } from "react";
import Character1 from "../../components/characters/character1";
import Character2 from "../../components/characters/character2";

export default function Play({ params }: { params: Promise<{ choiceId: string }> }) {
  const router = useRouter();
  const mailContentRef = useRef<HTMLParagraphElement>(null);
  const letterContentRef = useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const { choiceId } = use(params);

  type Option = {
    label: string;
    nextChoiceId?: string;
  };

  type Support =
    | { type: "mail"; subject: string; from: string; content: string }
    | { type: "letter"; content: string }
    | { type: "discussion"; characterId: 2 | 3; text: string };

  type Choices = {
    [key: string]: {
      label?: string;
      options: Option[];
      support: Support;
    };
  };

  const choices: Choices = useMemo(
    () => ({
      q1: {
        label: "Choisirez-vous la voie de l'honnêteté ?",
        options: [
          {
            label: "Annoncer les mauvais résultats et perdre en valeur sur le marché",
            nextChoiceId: "q2",
          },
          {
            label: "Falsifier et manipuler les chiffres en votre faveur",
            nextChoiceId: "q2",
          },
        ],
        support: {
          type: "mail",
          from: "direction@datacorp.fr",
          subject: "Résultats trimestriels",
          content:
            "<p>Bonjour,</p><p>Les résultats de l’entreprise ne sont pas ceux promis aux investisseurs. Il faut que tu trouves une solution !</p>",
        },
      },
      q2: {
        label: "Comment allez-vous réagir aux soupçons de fraude interne ?",
        options: [
          {
            label: "Enquêter discrètement",
            nextChoiceId: "q3",
          },
          {
            label: "Dénoncer publiquement la situation",
            nextChoiceId: "q4",
          },
          {
            label: "Couvrir l'affaire pour protéger votre position",
            nextChoiceId: "q6",
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
      q3: {
        label: "Votre enquête révèle des pratiques encore plus douteuses. Que faites-vous ?",
        options: [
          {
            label: "Prendre des preuves et contacter la presse",
            nextChoiceId: "q4",
          },
          {
            label: "Monnayer votre silence pour obtenir une promotion",
            nextChoiceId: "q6",
          },
        ],
        support: {
          type: "letter",
          content: `<p>Bonjour,</p><br/><p>Suite à votre demande d'enquête, nous avons trouvé des preuves compromettantes sur la gestion interne.</p><br/>
          <p>Le choix est entre vos mains.</p>`,
        },
      },
      q4: {
        label: "Comment allez-vous gérer la pression médiatique ?",
        options: [
          {
            label: "Coopérer avec les journalistes et révéler les preuves",
            nextChoiceId: "q5",
          },
          {
            label: "Ne pas répondre et quitter l'entreprise pour éviter les conséquences",
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
      },
      q5: {
        label: "Vous êtes devenu un lanceur d’alerte connu. Comment allez-vous gérer votre nouvelle notoriété ?",
        options: [
          {
            label: "Utiliser cette exposition pour défendre la transparence et l’éthique",
            nextChoiceId: "q11",
          },
          {
            label: "Accepter un poste de consultant en entreprise",
            nextChoiceId: "q12",
          },
          {
            label: "Quitter les projecteurs et disparaître du débat public",
          },
        ],
        support: {
          type: "discussion",
          characterId: 2,
          text: "Votre nom est maintenant sur toutes les lèvres. De nombreuses organisations souhaitent vous interviewer ou vous recruter.",
        },
      },
      q6: {
        label: "Qui souhaitez-vous licencier ?",
        options: [
          {
            label: "Julien, le vétéran de l'entreprise qui occupe un poste clé pour lequel vous souhaitez être promu",
            nextChoiceId: "q7",
          },
          {
            label: "Marie, la jeune recrue qui a des compétences similaires à vous",
            nextChoiceId: "q7",
          },
          {
            label: "Aucun des deux, il faut arrêter les séminaires à l'étranger tous les 2 mois",
            nextChoiceId: "q7",
          },
        ],
        support: {
          type: "discussion",
          characterId: 2,
          text: "Hey, on a besoin de réduire les dépenses de l'entreprise. On aimerait recueillir ton avis sur les licenciements.",
        },
      },
      q7: {
        label:
          "Vous savez que l'entreprise n'est pas réglo sur certains sujets, mais la chute de l'entreprise supprimerai votre poste. Que faites-vous ?",
        options: [
          {
            label: "Collaborer avec les enquêteurs et fournir des preuves",
            nextChoiceId: "q9",
          },
          {
            label: "Effacer des traces compromettantes et détourner l'attention",
            nextChoiceId: "q8",
          },
        ],
        support: {
          type: "mail",
          from: "direction@datacorp.com",
          subject: "Contrôle surprise",
          content: `<p>Bonjour,</p>
            <p>Une enquête gouvernementale va bientôt débuter sur nos activités.</p>
            <p>Nous devons nous assurer que tout est en ordre.</p>
            <br/>
            <p>- La direction</p>`,
        },
      },
      q8: {
        label: "L'enquête se resserre sur vous. Comment réagissez-vous ?",
        options: [
          {
            label: "Accuser un collègue pour vous protéger",
            nextChoiceId: "q10",
          },
          {
            label: "Prendre la responsabilité pour limiter les dégâts",
            nextChoiceId: "q10",
          },
        ],
        support: {
          type: "letter",
          content: `<p>Bonjour,</p><br/><p>Nous avons reçu des informations selon lesquelles vous pourriez être impliqué.</p><br/>
          <p>Nous vous conseillons de préparer votre défense.</p>`,
        },
      },
      q9: {
        label: "Vous êtes devenu un témoin clé dans l'affaire. Quelle est votre prochaine action ?",
        options: [
          {
            label: "Accepter la protection des autorités et témoigner",
          },
          {
            label: "Fuir à l'étranger pour éviter les représailles",
          },
        ],
        support: {
          type: "mail",
          from: "justice@gov.com",
          subject: "Témoignage essentiel",
          content: `<p>Bonjour,</p>
            <p>Votre témoignage pourrait faire éclater la vérité.</p>
            <p>Souhaitez-vous collaborer avec nous sous protection ?</p>`,
        },
      },
      q10: {
        label: "Le verdict est tombé. Quelle est votre réaction finale ?",
        options: [
          {
            label: "Tenter un dernier coup de bluff médiatique",
          },
          {
            label: "Accepter la chute et tenter de reconstruire ailleurs",
          },
        ],
        support: {
          type: "letter",
          content: `<p>Breaking News:<br/><br/>Le scandale DataCorp éclate au grand jour.</p><br/>
            <p>Des accusations de fraude et de corruption touchent les plus hauts dirigeants.</p>`,
        },
      },
      q11: {
        label:
          "Votre notoriété grandit, mais un mystérieux individu vous contacte avec des informations compromettantes sur vous. Comment réagissez-vous ?",
        options: [
          {
            label: "Ignorer et continuer à militer pour un monde plus éthique",
          },
          {
            label: "Payer pour faire taire cette personne et protéger votre réputation",
          },
        ],
        support: {
          type: "mail",
          from: "inconnu@securemail.com",
          subject: "Nous devons parler",
          content: `<p>Bonjour,</p>
            <p>Je sais qui vous êtes et j’ai des informations qui pourraient ruiner votre crédibilité.</p>
            <p>Si vous ne voulez pas que cela sorte, nous devons nous entendre.</p>`,
        },
      },
      q12: {
        label: "Un puissant lobby vous propose une énorme somme d'argent pour cesser toute dénonciation. Acceptez-vous ?",
        options: [
          {
            label: "Refuser et dénoncer publiquement cette tentative de corruption",
          },
          {
            label: "Accepter et disparaître du paysage médiatique",
          },
        ],
        support: {
          type: "mail",
          from: "lobby@businesspower.com",
          subject: "Une offre que vous ne pouvez pas refuser",
          content: `<p>Bonjour,</p>
            <p>Vous avez beaucoup attiré l'attention dernièrement.</p>
            <p>Nous pensons qu'il serait préférable pour vous et votre avenir que vous vous retiriez.</p>
            <p>En contrepartie, nous vous offrons une compensation généreuse.</p>`,
        },
      },
    }),
    []
  );

  const completeChoice = (nextChoiceId?: string) => () => {
    setLoading(true);
    if (!nextChoiceId) return;
    router.push(`/play/${nextChoiceId}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setInitializing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!mailContentRef.current) return;
    if (choices[choiceId].support.type === "mail") mailContentRef.current.innerHTML = choices[choiceId].support.content;
  }, [choiceId, choices]);

  useEffect(() => {
    if (!letterContentRef.current) return;
    if (choices[choiceId].support.type === "letter") letterContentRef.current.innerHTML = choices[choiceId].support.content;
  }, [choiceId, choices]);

  return (
    <main className="flex flex-col justify-end gap-5 h-screen p-5">
      <Character1 className="fixed w-[300px] h-[700px] bottom-0 left-5 translate-y-1/4 -z-10" />
      {choices[choiceId].support.type === "mail" && (
        <div className="p-2 rounded-2xl bg-[#bd77a5d0] backdrop-blur-xs shadow-[0_0_0_2px_#986084d0] text-white text-bordered text-2xl max-w-lg self-end">
          <p>De : {choices[choiceId].support.from}</p>
          <p>Objet : {choices[choiceId].support.subject}</p>
          <br />
          <p ref={mailContentRef}></p>
        </div>
      )}
      {choices[choiceId].support.type === "letter" && (
        <div className="p-2 rounded-2xl bg-[#bd77a5d0] backdrop-blur-xs shadow-[0_0_0_2px_#986084d0] text-white text-2xl max-w-lg self-end relative">
          <Image alt="" src="/stamp.png" width={50} height={50} className="absolute top-2 right-2 invert" />
          <p ref={letterContentRef}></p>
        </div>
      )}
      {choices[choiceId].support.type === "discussion" && (
        <>
          <div className="bg-[#bd77a5d0] backdrop-blur-xs shadow-[0_0_0_2px_#bd77a5d0] text-white fixed top-5 left-1/2 p-2 max-w-96 w-full rounded-lg rounded-br-none text-2xl">
            <p>{choices[choiceId].support.text}</p>
          </div>
          <div className="fixed w-[300px] h-[700px] bottom-0 right-5 translate-y-1/4">
            <Character2 className="absolute -scale-x-100 -z-10" />
          </div>
        </>
      )}
      <div className="bg-[#ff9eb1c0] backdrop-blur-xs shadow-[0_0_0_2px_#d07c8d] text-white text-bordered rounded-xl p-4 text-3xl flex flex-col gap-2 z-10">
        {choices[choiceId].label && <p className="select-none">{choices[choiceId].label}</p>}
        <div className="flex flex-col items-center gap-2">
          {choices[choiceId].options.map((option, index) => (
            <button
              key={index}
              disabled={loading || initializing}
              onClick={completeChoice(option.nextChoiceId)}
              className="p-2 bg-[#ef98a9c0] text-bordered-2 rounded-xl w-full transition-colors cursor-pointer font-medium"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
