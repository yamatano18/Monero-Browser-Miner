let networkHeightSpan = document.getElementById("network-height");
let networkDifficultySpan = document.getElementById("network-difficulty");
let networkRewardSpan = document.getElementById("network-reward");
let poolHashRateSpan = document.getElementById("pool-hash-rate");
let poolMinersSpan = document.getElementById("pool-miners");
let serverHashRateSpan = document.getElementById("server-hash-rate");
let serverMinersSpan = document.getElementById("server-miners");
let dataReadyApiDiv = document.getElementById("data-api-ready");
let dataReadyServerDiv = document.getElementById("data-server-ready");
let dataLoaderDiv = document.getElementById("data-loader");

const URL_OMINE = "https://xmr.omine.org:8122/live_stats";
const URL_SERVER = "http://localhost:3000/api/";
const TIME_INTERVAL_API = 60000; // 1min
const TIME_INTERVAL_SERVER = 5000; // 5sek

let networkHeight = 0;
let networkDifficulty = 0;
let networkReward = 0;
let poolHashRate = 0;
let poolMiners = 0;
let serverHashRate = 0;
let serverMiners = 0;

dataReadyApiDiv.style.display = "none";

function refreshDataAPI() {
    fetch(URL_OMINE, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            networkHeight = `${data.network.height}`;
            networkDifficulty = `${data.network.difficulty}` / 1000000000;
            networkReward = `${data.network.reward}` / 1000000000000;
            poolHashRate = `${data.pool.hashrate}` / 1000;
            poolMiners = `${data.pool.miners}`;
            dataLoaderDiv.remove();
            dataReadyApiDiv.style.display = "block";
            networkHeightSpan.innerHTML = networkHeight;
            networkDifficultySpan.innerHTML = networkDifficulty.toFixed(3);
            networkRewardSpan.innerHTML = networkReward.toFixed(3);
            poolHashRateSpan.innerHTML = poolHashRate.toFixed(1);
            poolMinersSpan.innerHTML = poolMiners;
        })
        .catch(err => {
            console.error(err);
        });

    setTimeout(refreshDataAPI, TIME_INTERVAL_API);
}

function refreshDataServer() {
    fetch(URL_SERVER + "stats", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            serverHashRate = `${data.hashRate}` / 1000;
            serverMiners = `${data.minersNumber}`;
            serverHashRateSpan.innerHTML = serverHashRate.toFixed(3);
            serverMinersSpan.innerHTML = serverMiners;
        })
        .catch(err => {
            console.error(err);
        });

    setTimeout(refreshDataServer, TIME_INTERVAL_SERVER);
}

refreshDataAPI();
// refreshDataServer();