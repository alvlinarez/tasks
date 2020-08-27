const axios = require('axios');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('../config');

const googleOptions = {
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  //callbackURL: 'https://alvlinarez.dev/auth/google/callback'
  callbackURL: '/auth/google/callback'
};

passport.use(
  new GoogleStrategy(
    googleOptions,
    async (accessToken, refreshToken, { _json: profile }, done) => {
      const { name, email } = profile;
      if (!email || !name) {
        return done({ error: 'Error at signing in with Google' });
      }
      try {
        const { data } = await axios.post(
          `${config.apiUrl}auth/signin-provider`,
          {
            name,
            email
          },
          {
            withCredentials: true
          }
        );
        if (!data) {
          done({ error: 'Error at signing in with Google' });
        }
        done(null, data);
      } catch (e) {
        done({ error: e.message });
      }
    }
  )
);
