import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { choicesHistory } = await request.json();

    const generationRes = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Ton but va être de déterminer la personnalité d'un joueur à partir de ses prises de décisions dans l'environnement d'une entreprise, DataCorp.
Tu dois retourner un texte qui décrit le joueur et ses choix, s'ils sont moraux ou non. Tu dois également écrire une très courte suite à l'histoire.
N'utilises pas de mise en forme spécifique, juste du texte brut.
Tu t'adresses directement au joueur.
Le texte doit être très concis et clair.
Il faut que tu sautes des lignes entre les paragraphes.
N'hésites pas à être extrêmement critique et à remettre en question le joueur.
Le premier paragraphe doit conclure l'histoire du joueur en mettant un terme à tout suspense.
Le deuxième paragraphe doit décrire le joueur, ses choix et sa personnalité, en commençant par "Vous êtes un joueur...".
Et enfin une phrase de remerciement.
Le joueur a été soumis a plusieurs dilemmes moraux et voici la liste de ses choix :\n
${choicesHistory}`,
          },
        ],
        stream: true,
      }),
    });

    if (!generationRes.ok) {
      throw new Error(`Erreur de l'API DeepSeek: ${generationRes.statusText}`);
    }

    return new Response(generationRes.body, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du flux:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
