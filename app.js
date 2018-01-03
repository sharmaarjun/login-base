require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// app.post('/users', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);

//     user.save().then(() => {
//         return user.generateAuthToken();
//         }).then((token) => {
//             res.header('x-auth', token).send(user);
//         }).catch((e) => {
//             res.status(400).send('Cannot save body', e);
//         })
// });

// copy from todo api

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    // user.save().then((user) => {
        // res.send(user);
        user.save().then(() => {
       return user.generateAuthToken();
          }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) =>{
            res.header('x-auth', token).send(user);
        }).catch((e)=>{
            res.status(400).send();
        });
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token',authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {app};