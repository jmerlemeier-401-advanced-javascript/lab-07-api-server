'use strict';

const express = require('express');

const app = express();
//app.use everywhere!
app.use(express.json());
app.use(addNumbers);
app.use(LOGGER);

//define a db in memory
//stores POST objects
// const db = [];

function notFound(req, res, next) {
  res.status(404).send('Not Found');
}

function LOGGER(req, res, next) {
  console.log(`${req.method}`)
  next();
}

const errorHandler = (status) => (req, res) => res.status(status).send('Error Found');

function logNumbers(req, res, next) {
  console.log('Here are you home numbers', req.numbers);
  next(); //MUST CALL THIS, if not handling response, you need next()
}

function addNumbers(req, res, next) {
  req.numbers = [1, 2, 3];
  next();
}

function handleNewRoute(req, res) {
  let number = req.numbers;
  res.send(`New Route numbers: ${number[0]} ${number[1]}`);
}

/**
 * Get a list of posts
 * @returns {array} db, status code 200 [...posts];
 * @returns {error} status code 500 - server error;
 */
app.get('/posts', logNumbers, (req, res) => {
  res.send('I am in here!');
});

app.get('/newroute', addNumbers, handleNewRoute);

// app.post()

//app.use special use case, put at bottom.
app.use(errorHandler(404));


//========== EXPORT ==========
// module.exports = {
//   app: app, //could just do app, 
//   start: () => {
//     app.listen(process.env.PORT || 3001, () => {
//       console.log(`Server listening`);
//     });
//   }
// }