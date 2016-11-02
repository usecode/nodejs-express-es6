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

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

mongorito.connect(config.database);

// API ROUTES -------------------
let apiRoutes = express.Router();

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
      if (userName === name && userPassword === password) {
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        res.json({
          result: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

// middleware verify a token
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/', (req, res) => {
  res.json({
    result: true,
    message: 'Welcome to the coolest API on earth!'
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

apiRoutes.get('/users', (req, res) => {
  co(function* () {
    let users = yield User.all();
    res.json(users);
  });
});

// namespace
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(config.port);
