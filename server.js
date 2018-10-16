const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// import chatkit
const ChatKit = require('@pusher/chatkit-server');

const app = express();

// initiate our own chatkit
const chatkit = new ChatKit.default({
  instanceLocator: 'v1:us1:5dff3a4f-a6e4-4036-b974-d09e53dc0568',
  key: '8735902e-5985-4858-a619-7f8ecb5dea3c:KHi93UxzBwxTdqbUUrFzk51UTDktYKfvVBOsjai2bEI='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// we then take a user and create a chatkit user through chatkit instance
app.post('/users', (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

// creating a room route
app.post('/createRoom', (req, res) => {
  const { username } = req.body;
  chatkit.createRoom({
    creatorId: username,
    name: 'some room'
  })
  .then(() => {
    console.log('Chat room created');
  }).catch((err) => {
    console.log(err);
  });
});

// authenticating a user
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

// host server on 3001
const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});


// commented out for now
// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const passport = require('passport');
// const favicon = require('serve-favicon');
// const path = require('path');

// // Here we use destructuring assignment with renaming so the two variables
// // called router (from ./users and ./auth) have different names
// // For example:
// // const actorSurnames = { james: "Stewart", robert: "De Niro" };
// // const { james: jimmy, robert: bobby } = actorSurnames;
// // console.log(jimmy); // Stewart - the variable name is jimmy, not james
// // console.log(bobby); // De Niro - the variable name is bobby, not robert
// const { router: usersRouter } = require('./users');
// const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

// mongoose.Promise = global.Promise;

// const { PORT, DATABASE_URL } = require('./config');

// const app = express();

// // Logging
// app.use(morgan('common'));

// // favicon control
// app.use(favicon(path.join(__dirname, 'public', '/favicon.ico')));

// // CORS not wokring?
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.send(204);
//   }
//   next();
// });

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// app.use('/api/users/', usersRouter);
// app.use('/api/auth/', authRouter);

// const jwtAuth = passport.authenticate('jwt', { session: false });

// // A protected endpoint which needs a valid JWT to access it
// app.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: 'rosebud'
//   });
// });

// app.use('*', (req, res) => {
//   return res.status(404).json({ message: 'Not Found' });
// });

// // Referenced by both runServer and closeServer. closeServer
// // assumes runServer has run and set `server` to a server object
// let server;

// function runServer(databaseUrl, port = PORT) {

//   return new Promise((resolve, reject) => {
//     mongoose.connect(databaseUrl, err => {
//       if (err) {
//         return reject(err);
//       }
//       server = app.listen(port, () => {
//         console.log(`Your app is listening on port ${port}`);
//         resolve();
//       })
//         .on('error', err => {
//           mongoose.disconnect();
//           reject(err);
//         });
//     });
//   });
// }

// function closeServer() {
//   return mongoose.disconnect().then(() => {
//     return new Promise((resolve, reject) => {
//       console.log('Closing server');
//       server.close(err => {
//         if (err) {
//           return reject(err);
//         }
//         resolve();
//       });
//     });
//   });
// }

// if (require.main === module) {
//   runServer(DATABASE_URL).catch(err => console.error(err));
// }

// module.exports = { app, runServer, closeServer };
