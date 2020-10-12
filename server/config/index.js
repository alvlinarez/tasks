require('dotenv').config();
const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL,
  NODE_ENV,
  PORT
} = process.env;

module.exports = {
  apiUrl: API_URL,
  port: PORT,
  env: NODE_ENV,
  facebookClientId: FACEBOOK_CLIENT_ID,
  facebookClientSecret: FACEBOOK_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET
};
