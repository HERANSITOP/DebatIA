const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE_TOKEN,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

module.exports = { checkJwt };
