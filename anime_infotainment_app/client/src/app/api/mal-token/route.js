export async function POST(req) {
    const { code, codeVerifier, redirectUri } = await req.json();
    const CLIENT_ID = process.env.MAL_CLIENT_ID;
    const CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;
    try {
        const response = await fetch("https://myanimelist.net/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
                code_verifier: codeVerifier,
                redirect_uri: redirectUri,
            }),
        });
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error fetching access token:", error);
        return Response.json({ error: "Failed to fetch token" }, { status: 500 });
    }
}