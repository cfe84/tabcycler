let intervalId;
let rotationInterval = 5000; 
let refreshAfterRotate = true;

function start() {
  refreshSettingsAsync();
}

async function refreshSettingsAsync() {
  const settings = await getSettingsAsync();
  rotationInterval = settings.rotationInterval || rotationInterval;
  if (settings.refreshAfterRotate !== undefined) refreshAfterRotate = settings.refreshAfterRotate;
  startTabRotation();
}

function startTabRotation() {
  intervalId = setInterval(rotateTabAsync, rotationInterval);
}

function stopTabRotation() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'start') {
    startTabRotation();
  }
  else if (message.action === 'stop') {
    stopTabRotation();
  }
  else if (message.action === 'refresh') {
    refreshSettingsAsync().then();
  }
});

function getSettingsAsync() {
  return new Promise(resolve => {
    browser.storage.sync.get(['rotationInterval', 'refreshAfterRotate']).then((result) => {
      resolve(result);
    });
  });
}

async function rotateTabAsync() {
  let tabs = await browser.tabs.query({});
  let activeTab = tabs.find(tab => tab.active);
  let currentIndex = tabs.indexOf(activeTab);
  let nextIndex = (currentIndex + 1) % tabs.length;
  
  await browser.tabs.update(tabs[nextIndex].id, { active: true });
  
  if (refreshAfterRotate) {
    browser.tabs.reload(tabs[currentIndex].id);  // Refresh the previously active tab
  }
}

start();
