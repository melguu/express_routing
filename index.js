/**
 * Created by milosberka on 10.4.2017.
 */
'use strict';
const express = require('express');
const userAgent = require('express-useragent');
const bodyParser = require('body-parser');
const cparser = require('cookie-parser');
const setCookie = require('set-cookie');
const momentJS = require('moment');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cparser());
app.use(userAgent.express());

app.use('/*', (req, res, next) => {
    console.log('Got to the root with path: ' + req.path + '<br>At time: ' + momentJS().format() + '<br>Browser: ' + req.useragent.browser +'<br>IP: '+ req.ip);
    next();
});

app.use(require('./routes/user'));

console.log('inspector started');
app.listen(3000);
