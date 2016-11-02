import co from "co";
import express from 'express';
import bodyParser from 'body-parser';
import mongorito from 'mongorito';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import config from './config/index';
import User from'./app/user/user';

let app = express();

// =======================
// configuration =========
// =======================
let port = 3000; // used to create, sign, and verify tokens

app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

mongorito.connect(config.database);

// =======================
// routes ================
// =======================
// basic route
//app.get('/', function(req, res) {
//  res.send('Hello! The API is at http://localhost:' + port + '/api');
//});

// API ROUTES -------------------

// get an instance of the router for api routes
let apiRoutes = express.Router();

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', (req, res) => {
  res.json({
    result: true,
    message: 'Welcome to the coolest API on earth!'
  });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', (req, res) => {
  const name = req.body.user;
  const password = req.body.password;

  co(function* () {
    let user = yield User.findOne({"name": name});

    let userName = user.get('name');
    let userPassword = user.get('password');

    if (!user || userPassword !== password) {
      res.json({
        success: false,
        message: 'Authentication failed. Wrong user or password.'
      });
    } else if (user) {
      // check if password matches
      if (userName === name && userPassword === password) {
        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          result: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

apiRoutes.put('/user', function(req, res) {
  const name = req.body.user;
  const password = req.body.password;

  co(function* () {
    let user = new User({
      name: name,
      password: password
    });

    yield user.save();

    res.json({
      result: true,
      user: user
    });
  });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', (req, res) => {
  co(function* () {
    let users = yield User.all();
    res.json(users);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
