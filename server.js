const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var json_body_parser = bodyParser.json();

const port = process.env.PORT || 3000;
var router = express.Router();

var miners = [];
var minersRate = [0];
var hashRate = 0;

app.use(json_body_parser);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

router.get('/', (req, res) => {
    res.send('Welcome to Monero Miner Serwer');
});

router.get('/miners', (req, res) => {
    res.json({miners});
    console.log("Pobrano miners[]");
});

router.get('/miners/num', (req, res) => {
    res.json({"minersNumber": miners.length});
    console.log("Pobrano miners.lenght");
});

router.get('/hashrate', (req, res) => {
    hashRate = 0;
    for (let i = 0; i < minersRate.length; i++) {
        hashRate += minersRate[i];
    }
    res.json({"hashRate": hashRate,
            "minersHashes": minersRate});
    console.log("Pobrano hashRate = " + hashRate);
});

router.get('/stats', (req, res) => {
    hashRate = 0;
    for (let i = 0; i < minersRate.length; i++) {
        hashRate += minersRate[i];
    }
    res.json({
        "minersNumber": miners.length,
        "hashRate": hashRate
    });
    console.log("Pobrano statystyki serwera");
});


router.post('/miner', (req, res) => {
    var name = req.body.minerName;
    res.send('POST new miner ' + name);
    miners.push(name);
    console.log(miners);
});

router.post('/miner/hashrate', (req, res) => {
    let name = req.body.minerName;
    let minerRate = req.body.hashRate;
    res.send('Miner ' + name + ' with ' + minerRate + ' H/s');
    let position = miners.indexOf(name);
    minersRate[position] = minerRate;
});

router.post('/miner/delete', (req, res) => {
    var name = req.body.minerName;
    res.send('Deleting miner ' + name);
    let index = miners.indexOf(name);
    miners.splice(index, 1);
    minersRate.splice(index, 1);
});

app.listen(port, () => {
    console.log('Server started at port 3000!');
});