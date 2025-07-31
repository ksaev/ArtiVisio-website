export async function POST(req: Request) {
  try {
    const body = await req.json();

    const restApiKey = process.env.ONESIGNAL_REST_API_KEY;
    const appId = process.env.NEXT_PUBLIC_APP_ID_ONESIGNAL;

    if (!restApiKey || !appId) {
      return new Response(
        JSON.stringify({ error: "Clés API OneSignal manquantes" }),
        { status: 500 }
      );
    }

    const notification = {
      ...body,
      app_id: appId,
    };

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${restApiKey}`,
      },
      body: JSON.stringify(notification),
    });

    const text = await response.text(); // ← Ne fait pas res.json() tout de suite

    if (!response.ok) {
      console.error("Erreur OneSignal:", text); // pour debug
      return new Response(
        JSON.stringify({ error: "Notification échouée", details: text }),
        { status: 500 }
      );
    }

    return new Response(text, { status: 200 });

  } catch (error) {
    console.error("Erreur interne:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur", details: `${error}` }),
      { status: 500 }
    );
  }
}
