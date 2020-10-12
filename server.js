const express = require('express');
const next = require('next');
const config = require('./server/config/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { passportRoutes } = require('./server/passportRoutes');

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
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

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
