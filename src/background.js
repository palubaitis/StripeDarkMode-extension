/* ============================================================
   Stripe Dark Mode — service worker (MV3)
   Handles the keyboard shortcut, keeps the toolbar badge in sync,
   and seeds default settings on install.
   ============================================================ */

var DEFAULTS = { enabled: true, intensity: 50 };

function updateBadge(enabled) {
  try {
    chrome.action.setBadgeText({ text: enabled ? "" : "off" });
    chrome.action.setBadgeBackgroundColor({ color: "#635BFF" });
    chrome.action.setTitle({
      title: "Stripe Dark Mode — " + (enabled ? "on" : "off"),
    });
  } catch (e) {}
}

/* Broadcast a state change to every Stripe tab so the toggle is
   instant, even before chrome.storage.onChanged propagates. */
function broadcast(state) {
  chrome.tabs.query(
    { url: ["https://dashboard.stripe.com/*", "https://connect.stripe.com/*"] },
    function (tabs) {
      if (!tabs) return;
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(
          tab.id,
          { type: "SDM_APPLY", state: state },
          function () {
            // Swallow "no receiver" errors for tabs without the script.
            void chrome.runtime.lastError;
          }
        );
      });
    }
  );
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(DEFAULTS, function (state) {
    chrome.storage.sync.set(state, function () {
      updateBadge(state.enabled);
    });
  });
});

chrome.runtime.onStartup.addListener(function () {
  chrome.storage.sync.get(DEFAULTS, function (state) {
    updateBadge(state.enabled);
  });
});

/* Keyboard shortcut: flip enabled, persist, broadcast, badge. */
chrome.commands.onCommand.addListener(function (command) {
  if (command !== "toggle-dark-mode") return;
  chrome.storage.sync.get(DEFAULTS, function (state) {
    var next = Object.assign({}, state, { enabled: !state.enabled });
    chrome.storage.sync.set(next, function () {
      updateBadge(next.enabled);
      broadcast(next);
    });
  });
});

/* Keep the badge correct whenever settings change anywhere. */
chrome.storage.onChanged.addListener(function (changes, area) {
  if (area === "sync" && changes.enabled) {
    updateBadge(changes.enabled.newValue);
  }
});
