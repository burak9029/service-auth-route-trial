#! /usr/bin/env node
var db = require('redis').createClient();
var model = require('../Route-Controller-Service/server/app');
db.multi()
.hmset('users:username', {
id: 'username',
username: 'username',
password: 'password'
})
.hmset('clients:client', {
clientId: 'client',
clientSecret: 'secret'
})//clientId + clientSecret to base 64 will generate Y2xpZW50OnNlY3JldA==
.sadd('clients:client:grant_types', [
'password',
'refresh_token'
])
.exec(function (errs) {
if (errs) {
console.error(errs[0].message);
return process.exit(1);
}
console.log('Client and user added successfully');
process.exit();
});