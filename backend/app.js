const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();
const app = express();

// Middleware para validar el JWT
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE_TOKEN,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

app.get("/token", async (req, res) => {
  try {
    const response = await fetch('https://dev-2eco3268ivgvoe7i.us.auth0.com/oauth/token', {
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

    if (!response.ok) {
      console.error("Auth0 error:", data); 
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: process.env.AUTH0_REDIRECT_URI+"/callback"
    }),
  });

  const data = await response.json();
  console.log("Tokens recibidos:", data);

  res.json(data);
});



app.get("/public", (req, res) => {
  res.json({ message: "Ruta pública 🚀" });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({ message: "Ruta privada ✅", user: req.auth });
});

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});
