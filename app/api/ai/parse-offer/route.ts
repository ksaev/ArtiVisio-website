import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const { text } = await req.json();

    const prompt = `
Analyse cette offre d'emploi et retourne uniquement du JSON valide :

{
"title":"",
"company":"",
"location":"",
"salary":"",
"type":"",
"sector":"",
"description":"",
"requirements":"",
"mail":"",
"link":""
}

Texte :
${text}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json(
        { error: "Erreur OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result: data.output_text
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );

  }
}