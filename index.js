var express = require('express');
var port = process.env.PORT || 3000;
var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'app', 'build');

app.use(express.static(publicDir))

app.use('/api', (req, res, next) => {
    res.json({foo: 'bar'})
});

app.listen(port);
module.exports = app;
