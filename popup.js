if (typeof browser === 'undefined') {
  browser = chrome;
}

document.getElementById('start').addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'start' });
});

document.getElementById('stop').addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'stop' });
});
