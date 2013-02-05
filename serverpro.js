var express = require('express');

var app = express();

app.configure(function () {
    app.set('title', 'Shoutbox')
    //app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.listen(8000);

var shouts = [];

app.get('/', function (req, res) {
    res.send('Welcome to Shoutbox !!!!');
});

app.post('/shout', function (req, res) {
    if(req.body.name && req.body.text) {
        shouts.push({name: req.body.name, text: req.body.text});
        res.send({status: "ok", message: "Shout received"});
    } else {
        res.send({status: "error", message: "No shout received"});
    }
});

app.get('/shouts', function (req, res) {
    res.send(shouts);
});