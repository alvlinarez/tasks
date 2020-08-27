const passport = require('passport');
require('./strategies/google');
require('./strategies/facebook');

exports.passportRoutes = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      if (!req.user) {
        return res.status(401).json({
          error: `Error signing in with Google`
        });
      }
      const { token } = req.user;
      res.cookie('token', token, {
        httpOnly: true,
        secure: false
      });
      return res.redirect('/');
    }
  );
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    (req, res) => {
      if (!req.user) {
        return res.status(401).json({
          error: `Error signing in with Facebook`
        });
      }
      const { token } = req.user;
      res.cookie('token', token, {
        httpOnly: true,
        secure: false
      });
      return res.redirect('/');
    }
  );
};
