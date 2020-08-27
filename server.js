const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { passportRoutes } = require('./server/passportRoutes');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(cookieParser());

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
