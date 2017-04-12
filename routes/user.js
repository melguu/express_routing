/**
 * Created by milosberka on 12.4.2017.
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb://userDbAdmin:sala123@localhost/users');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db');
});

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    pwd: String
});

const User = mongoose.model('User', userSchema);

router.route('/user/(:userId)?')
    .get((req, res) => {
        User.find({}, (err, data) => {
            if (err) return res.send(err);
            res.send(JSON.stringify(data[Math.floor(Math.random() * data.length)]));
        });
    })
    .post((req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.pwd
        });
        newUser.save((err, newUser) => {
            if (err) return res.send(err);
            console.log(newUser);
        });
        res.send('User added');
    })
    .put((req, res) => {
        User.findOneAndUpdate({_id: req.query.userId}, req.body, (err) => {
            if (err) return res.send(err);
            res.send('Update the user');
        });
    })
    .delete((req, res) => {
        User.remove({_id: req.query.userId}, (err) => {
            if (err) return res.send(err);
            res.send('Delete the user');
        });
    });

module.exports = router;
