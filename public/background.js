chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "onboarding.html",
    });
  }
});

function sendMessageToActiveTab(message) {
  const [tab] = chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = chrome.tabs.sendMessage(tab.id, message);
  // TODO: Do something with the response.
}

// 현재 탭 가져오기
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
