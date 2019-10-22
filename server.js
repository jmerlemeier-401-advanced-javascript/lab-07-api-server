'use strict';

const express = require('express');

const app = express();
//app.use everywhere!
app.use(addNumbers);
app.use(LOGGER);

const PORT = process.env.PORT || 3001;

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

app.get('/', logNumbers, (req, res) => {
  res.send('You have hit the home route');
});

app.get('/newroute', addNumbers, handleNewRoute);



//app.use special use case, put at bottom.
app.use(errorHandler(404));


// app.post();
// app.patch();
// app.delete();

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}, nice.`)
});