const fetch = require("node-fetch");

exports.getToken = async (req, res) => {
  try {
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE_TOKEN,
        grant_type: "client_credentials"
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    res.json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
};

exports.callback = async (req, res) => {
  const code = req.query.code;

  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: process.env.AUTH0_REDIRECT_URI + "/callback"
    }),
  });

  const data = await response.json();
  console.log("Tokens recibidos:", data);
  res.json(data);
};
