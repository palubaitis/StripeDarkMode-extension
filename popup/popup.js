/* Stripe Dark Mode — popup logic */
(function () {
  "use strict";

  var DEFAULTS = { enabled: true, intensity: 50 };

  var toggle = document.getElementById("toggle");
  var statusText = document.getElementById("status-text");
  var intensity = document.getElementById("intensity");
  var intensityText = document.getElementById("intensity-text");

  function intensityLabel(v) {
    if (v < 25) return "Soft";
    if (v < 60) return "Balanced";
    if (v < 85) return "Deep";
    return "Maximum";
  }

  function render(state) {
    toggle.checked = !!state.enabled;
    statusText.textContent = state.enabled ? "Enabled" : "Disabled";
    intensity.value = state.intensity;
    intensity.disabled = !state.enabled;
    intensityText.textContent = intensityLabel(Number(state.intensity));
  }

  /* Persist + push live to active Stripe tabs for an instant response. */
  function save(state) {
    chrome.storage.sync.set(state);
    chrome.tabs.query(
      {
        url: [
          "https://dashboard.stripe.com/*",
          "https://connect.stripe.com/*",
        ],
      },
      function (tabs) {
        (tabs || []).forEach(function (tab) {
          chrome.tabs.sendMessage(
            tab.id,
            { type: "SDM_APPLY", state: state },
            function () {
              void chrome.runtime.lastError;
            }
          );
        });
      }
    );
  }

  function currentState() {
    return {
      enabled: toggle.checked,
      intensity: Number(intensity.value),
    };
  }

  // Load saved settings into the UI.
  chrome.storage.sync.get(DEFAULTS, function (state) {
    render(state);
  });

  toggle.addEventListener("change", function () {
    var state = currentState();
    render(state);
    save(state);
  });

  intensity.addEventListener("input", function () {
    intensityText.textContent = intensityLabel(Number(intensity.value));
  });
  intensity.addEventListener("change", function () {
    save(currentState());
  });
})();
