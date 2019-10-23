'use strict';

const express = require('express');

const app = express();
app.use(express.json());

//define a db in memory
//stores POST objects
const db = [];

const errorHandler = (status) => (err, req, res) => res.status(status).send('Error Found');

//============= MIDDLEWARE ================
//Function currying
function LOGGER(message) {

  return function requestTime(req, res, next) {
    req.time = Date.now();
    console.log(`${req.path}, ${req.method}, ${req.time}, ${message}`);
    next();
  }
}

function randomBoolean(req, res, next){
  req.valid = Boolean(Math.round(Math.random()));
  next();
}

//======= app.use ===========
// app.use(LOGGER('Ohh, you betcha...your code worked'));
// app.use(randomBoolean());

//========== ROUTE TO GET ALL CATEGORIES ========
/**
 * Get a list of posts
 * @returns {array} db, status code 200 [...posts];
 * @returns {error} status code 500 - server error;
 */
app.get('/categories', randomBoolean, LOGGER('GET categories'), (req, res, next) => {
  let count = db.length;
  let results = db;
  // if (req.valid) {
    res.json({ count, results });  
  // } else {
  //   res.send('invalid');
  // }
  
});

//========== ROUTE TO CREATE A CATEGORY ========
app.post('/categories', randomBoolean, LOGGER('POST categories'), (req, res, next) => {
    // if(req.valid === 'true'){
      let record = req.body;
      record.id = Math.random();
      db.push(record);
      res.json(record);
      res.sendStatus(200);
    // } else {
    //   next('invalid');
    // }
});

//app.use special use case, put at bottom.
app.use(errorHandler(404));
app.use(errorHandler(500));

//========== EXPORT ==========
module.exports = {
  app: app, //could just do app, 
  start: () => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  },
}
