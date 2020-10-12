const axios = require('axios');
const config = require('./config/index');

exports.authRoutes = (app) => {
  app.post('/auth/signin', async (req , res) => {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: 'Error at signing in' });
    }
    try {
      const { data } = await axios.post(
        `${config.apiUrl}/auth/signin`,
        {
          email,
          password
        }
      );
      if (!data) {
        return res.status(401).json({ error: 'Error at signing in with Google' });
      }
      const {token, user} = data;
      res.cookie('token', token, {
        httpOnly: true,
        secure: false
      });
      return res.status(200).json({
        user
      });
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  })
};
