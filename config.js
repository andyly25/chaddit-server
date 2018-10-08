'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

// I decided to see if I can host the example code correctly first, but I've been having problems.
// It works locally, so now I move on to hosting. 
// For the node js code I hosted at Heroku and included a DATABASE_URL with my mlab in the Heroku settings. 
// And for the Reactjs code I made it grab from the heroku app url: https://chaddit-server.herokuapp.com/api in the configs
// At http://chaddit-client.surge.sh/ I can see it was able to display the login/register forms.
// However if I were to try register or login I receive this 
// Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource
// the nodejs code already included some code for cors, and I tried using the cors package as well.