const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const Cors = require('cors');

module.exports = () => {
  const application = Express();
  application.use(BodyParser.json());
  application.use(Compression());
  const corsOptions = {
    credentials: true,
    origin: true
  };
  application.use(Cors(corsOptions));
  application.options('*', Cors(corsOptions));

  return application;
};
