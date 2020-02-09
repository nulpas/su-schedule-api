//Load express module with `require` directive
const express = require('express');
const pollo = require('./ecosystem.config');
const app = express();

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!');
  console.log(pollo.apps[0].env.NODE_ENV);
  console.log(pollo.apps[0].env.JWT_SECRET);
  console.log(pollo.apps[0].env.SALT_ROUNDS);
});
