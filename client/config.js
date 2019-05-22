var timeout;
var isRunning = false;
var lastHashes = 0;
var calcHashes = 0;
const TIME_INTERVAL = 2000;
var SERVER_LINK = "http://localhost:3000/api/";
var MINER_NAME = "";

var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var log = document.getElementById("logger");
var hashSpeedSpan = document.getElementById("hashSpeed");
var totalHashSpan = document.getElementById("hashTotal");
var minerNameInput = document.getElementById("minerName");

startButton.addEventListener("click", () => {
    MINER_NAME = minerNameInput.value;
    startMiner();
});

stopButton.addEventListener("click", () => {
    stopMiner();
})

function miner(threads, power, MINER_NAME) {
    if (threads === 0 || threads < -1)
        threads = -1;
    if (power > 0 && power < 100) {
        throttle = 100 - power;
    } else {
        throttle = 0;
    }
    if (minerNameInput.value.length > 0) {
        MINER_NAME = minerNameInput.value;
    } else {
        MINER_NAME = randomId();
    }

    let miner = {
        "minerName": MINER_NAME
    }

    console.log(miner);
    window.fetch(SERVER_LINK + "miner", {
        method: 'POST',
        body: JSON.stringify(miner),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.text();
    }, (error) => {
        console.log(error.message);
    });

    // OMINEId("a06e93eca8e9420ea64fdb5136e0b4b7", threads)
    OMINE("45EhioCzdXjfsnwYJzbqyb5zfHdRoacY9A9mUsJ2WmUkbE5aYrSEatAASzyCtF1rG7Y5p9N9GB6nbKL8UmbWoP7m9AVkEEw#" + MINER_NAME, threads), // -1 means use all cpu threads
        throttleMiner = throttle, //20 means 80% of cpu usage
        addText("Starting miner..."),
        timeout = setInterval(function () {
            for (; sendStack.length > 0;) addText(sendStack.pop());
            for (; receiveStack.length > 0;) addText(receiveStack.pop());
            calcHashes = totalhashes;
            updateHashRate();
            updateHashTotal(calcHashes);
            // updateBars();
            lastHashes = calcHashes;
        }, TIME_INTERVAL);
}

function addText(event) {
    "job" === event.identifier ? log.value += "New job: " + event.job_id : "solved" === event.identifier ?
        log.value += "Solved job: " + event.job_id : "hashsolved" === event.identifier ?
        log.value += "Pool accepted hash!" : "error" === event.identifier ?
        log.value += "Error: " + event.param : log.value += event, log.value += "\n", log.scrollTop = log.scrollHeight;
}

function startMiner() {
    if (isRunning) {
        console.log("Miner is working currently!")
    } else {
        let threads = document.getElementById('thread-number').value;
        let power = document.getElementById('power-number').value;
        miner(threads, power);
        isRunning = true;
        console.log("Miner started with " + threads + "!");
    }
};

function stopMiner() {
    if (isRunning) {
        var miner = {
            "minerName": MINER_NAME
        }
        window.fetch(SERVER_LINK + "miner/delete", {
            method: 'POST',
            body: JSON.stringify(miner),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.text();
        }, (error) => {
            console.log(error.message);
        });
        stopMining();
        isRunning = false;
        hashSpeedSpan.innerHTML = 0;
        clearInterval(timeout);
        log.value += "Miner stoppped!\n";
        console.log("Miner stopped!");
    } else {
        console.log("Miner is not mining currently!")
    }
};

function updateHashRate() {
    let hashRate = parseFloat((calcHashes - lastHashes) / (TIME_INTERVAL / 1000));
    hashSpeedSpan.innerHTML = hashRate;
    let minerRate = {"minerName": MINER_NAME, "hashRate": hashRate};
    window.fetch(SERVER_LINK + "miner/hashrate", {
        method: 'POST',
        body: JSON.stringify(minerRate),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.text();
    }, (error) => {
        console.log(error.message);
    });
}

function updateHashTotal(totalHashes) {
    totalHashSpan.innerHTML = totalHashes;
}

function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}