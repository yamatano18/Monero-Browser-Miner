var incThreadsButton = document.getElementById('threads-increment');
var decThreadsButton = document.getElementById('threads-decrement');
var threadsInput = document.getElementById('thread-number');

incThreadsButton.addEventListener('click', () => {
    threadsInput.value = parseInt(threadsInput.value) + 1;
});

decThreadsButton.addEventListener('click', () => {
    threadsInput.value = parseInt(threadsInput.value) - 1;
});


var incPowerButton = document.getElementById('power-increment');
var decPowerButton = document.getElementById('power-decrement');
var powerInput = document.getElementById('power-number');

incPowerButton.addEventListener('click', () => {
    powerInput.value = parseInt(powerInput.value) + 5;
});

decPowerButton.addEventListener('click', () => {
    powerInput.value = parseInt(powerInput.value) - 5;
});