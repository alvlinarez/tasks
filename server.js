const express = require('express');
const next = require('next');
const axios = require('axios');
const config = require('./server/config/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { passportRoutes } = require('./server/passportRoutes');
const { authRoutes } = require('./server/authRoutes');

const dev = config.env !== 'production';
const port = config.port || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(cookieParser());
    server.use(bodyParser.json());

    // Route to sign in and generate cookie
    //authRoutes(server);
    server.post('/auth/signin', async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ error: 'Error at signing in' });
      }
      try {
        const { data } = await axios.post(`${config.apiUrl}auth/signin`, {
          email,
          password
        });
        if (!data) {
          return res
            .status(401)
            .json({ error: 'Error at signing in with Google' });
        }
        const { token, user } = data;
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
    });

    // GOOGLE AND FACEBOOK AUTH ROUTES
    passportRoutes(server);

    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  });
