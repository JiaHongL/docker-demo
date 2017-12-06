var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/info', function (req, res) {
    var date = new Date().toISOString().replace('T', ' ').substr(0, 19);
    var output = {
        'Today': date,
        'Name': 'Joe',
        'Age': 26
    };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(output);
});

app.listen(8080)