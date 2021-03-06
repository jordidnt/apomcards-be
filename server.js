require('dotenv').config();
const port = Number.parseInt(process.env.PORT, 10);
const Application = require('./application');
const application = Application();
// const Users = require('./users');
const Health = require('./health');
const Games = require('./games');
const Submissions = require('./submissions');
const Firebase = require('./lib/firebase');
const firebase = Firebase();
const dbUtils = require('./utils/dbUtils')();

async function main() {

  application.use('/health', Health());
  // application.use('/users', Users(firebase));
  application.use('/games', Games(firebase, dbUtils));
  application.use('/submissions', Submissions(firebase));
  // custom 404 page to avoid html
  application.use((req, res, next) => res.sendStatus(404));
  application.use((error, req, res, next) => {
    if (error) {
      // const formattedError = formatError(error);
      res.status(500).send(error);
      return;
    } else {
      return next();
    }
  });

  const server = application.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Template server up and running, listening at http://${host}:${port}`); // eslint-disable-line no-console
  });
}

main();

process.on('uncaughtException', (error) => {
  // logger.error('uncaught exception', formatError(error), () => process.exit(1));
});

process.on('unhandledRejection', (error) => {
  // logger.error('unhandled rejection', formatError(error), () => process.exit(1));
});
