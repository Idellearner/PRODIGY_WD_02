let timer;
let startTime;
let running = false;
let laps = [];
let lapsContainer = document.getElementById('laps');
let display = document.getElementById('display');

function startStop() {
  if (!running) {
    running = true;
    startTime = Date.now() - laps.reduce((total, lap) => total + lap, 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById('startStop').innerText = 'Stop';
  } else {
    running = false;
    clearInterval(timer);
    document.getElementById('startStop').innerText = 'Start';
  }
}

function reset() {
  running = false;
  clearInterval(timer);
  document.getElementById('startStop').innerText = 'Start';
  display.textContent = '00:00:00';
  laps = [];
  lapsContainer.innerHTML = '';
}

function lap() {
  if (running) {
    let currentTime = Date.now();
    let lapTime = currentTime - startTime - laps.reduce((total, lap) => total + lap, 0);
    laps.push(lapTime);
    let lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsContainer.appendChild(lapItem);
  }
}

function updateDisplay() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime - laps.reduce((total, lap) => total + lap, 0);
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  let date = new Date(time);
  let minutes = date.getUTCMinutes().toString().padStart(2, '0');
  let seconds = date.getUTCSeconds().toString().padStart(2, '0');
  let milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}
