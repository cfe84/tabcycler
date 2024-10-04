if (typeof browser === 'undefined') {
  browser = chrome;
}

document.getElementById('save').addEventListener('click', () => {
  const interval = document.getElementById('interval').value * 1000;
  const refresh = document.getElementById('refresh').checked;

  browser.storage.sync.set({
    rotationInterval: interval,
    refreshAfterRotate: refresh
  }).then(() => {
    alert('Settings saved');
    browser.runtime.sendMessage({ action: 'refresh' });
  });
});

function loadSettings() {
  browser.storage.sync.get(['rotationInterval', 'refreshAfterRotate']).then((result) => {
    if (result.rotationInterval) {
      document.getElementById('interval').value = (result.rotationInterval / 1000) || 5;
    }
    document.getElementById('refresh').checked = result.refreshAfterRotate || true;
  });
}

loadSettings();
