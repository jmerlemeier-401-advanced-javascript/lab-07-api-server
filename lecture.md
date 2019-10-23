# Class 07

## Linked List

```js
'use strict'

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = null;
  }

  //traversing a linked list
  traverse() {
    let current = this.head;

    while(current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const Node1 = new Node(1);

const ll = new LinkedList();

ll.head = new Node(1);
ll.head.next = new Node(2);
ll.traverse();
```

## Express!!!

- Framework used to build HTTP powered APIs in JS.
  - What is a Framework vs what is a Library
  - Framework: Spaghetti and the code is the meatballs. Framework gives you a lot of code and dev adds pieces.
  - Library: helps you out, give you little utility functions and small peices of code and your code is the majority of the code base.

Express...is a framework.
(React is framework, but it is very flexible. Kind of halfway between framework and library).

Express...is non-opinionated. It is not going to make a lot of decisions for you.

## Middleware

- Sits inbetween the request and the response.

## HTTP Routes

- 200: Happy place, all good ;)

- 400 level and client side, 500 is server side.
- 401: Unauthorized, user lacks credentials
- 404: Classic not found. When the specified location/route does not exist.
- 400: Bad request, client improper request formatting. (ie :suppose to send JSON, but sent a string).
- 500: Server error, this the worst case senario. Server crashed. Error in fucntionality. Not user's fault.

## Function currying

- A function that return another function

```js

function myCurriedFunction(name) {
  
  return function(greeting) {
    return `${greeting} ${name}`;
  }
}

console.log(myCurriedFunction('Jacob')('Hello'));

```



GARBAGEFILE.JS

```js
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
```