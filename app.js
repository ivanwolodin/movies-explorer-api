const express = require('express');

const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const helmet = require('helmet');
const { DATABASE_ADDRESS } = require('./utils/utils');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { handler404, generalErrorHandler } = require('./errors/errorHandlers');
// const { REGEX_MAIL_CHECK } = require('./utils/utils');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://localhost:27017/${DATABASE_ADDRESS}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.use(errorLogger);
app.use(require('./routes/authorization'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));
// app.use('/users', require('./routes/users'));
// app.use('/movies', require('./routes/movies'));

app.use(handler404);
app.use(errorLogger);
app.use(errors());
app.use(generalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
