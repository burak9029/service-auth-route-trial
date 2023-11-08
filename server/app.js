var express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const model = require('./routes/Oauth2/model.js');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.oauth = oauthserver({
    model: require('./routes/Oauth2/model'),
    grants: ['password', 'refresh_token'],
    debug: true
});

app.all('/oauth/token', app.oauth.grant());
app.get('/secret', app.oauth.authorise(), function (req, res) {

    res.send('Secret area');
});
app.get('/public', function (req, res) {

    res.send('Public area');
});

app.use(app.oauth.errorHandler());
app.listen(3000);