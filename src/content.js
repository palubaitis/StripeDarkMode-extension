/* ============================================================
   Stripe Dark Mode — content script
   Runs at document_start in every Stripe Dashboard frame.

   Responsibilities:
   - Apply the theme as early as possible to avoid a white flash
     (reads a synchronous localStorage cache, then reconciles with
     chrome.storage which is async).
   - Toggle the `.sdm-on` class on <html> and write the intensity
     CSS variables.
   - Respond to live messages from the popup / keyboard command.
   ============================================================ */
(function () {
  "use strict";

  var DEFAULTS = { enabled: true, intensity: 50 };
  var CACHE_KEY = "__sdm_state_v1";
  var root = document.documentElement;

  /* --- Map a 0–100 intensity slider to filter parameters ------ */
  function intensityToVars(intensity) {
    var t = Math.max(0, Math.min(100, Number(intensity) || 0)) / 100;
    // Lower intensity -> softer/greyer dark; higher -> deeper contrast.
    // brightness: 1.05 (soft) -> 0.92 (deep)
    // contrast:   0.88 (soft) -> 1.02 (deep)
    var brightness = (1.05 - 0.13 * t).toFixed(3);
    var contrast = (0.88 + 0.14 * t).toFixed(3);
    return { brightness: brightness, contrast: contrast };
  }

  function applyState(state) {
    var vars = intensityToVars(state.intensity);
    root.style.setProperty("--sdm-brightness", vars.brightness);
    root.style.setProperty("--sdm-contrast", vars.contrast);
    if (state.enabled) {
      root.classList.add("sdm-on");
    } else {
      root.classList.remove("sdm-on");
    }
  }

  /* --- Synchronous early paint from cache --------------------- */
  var early = DEFAULTS;
  try {
    var cached = window.localStorage.getItem(CACHE_KEY);
    if (cached) early = Object.assign({}, DEFAULTS, JSON.parse(cached));
  } catch (e) {
    /* localStorage may be unavailable in some sandboxed frames */
  }
  applyState(early);

  function cache(state) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  /* --- Reconcile with the authoritative chrome.storage value -- */
  function loadAndApply() {
    if (!chrome.storage || !chrome.storage.sync) return;
    chrome.storage.sync.get(DEFAULTS, function (state) {
      if (chrome.runtime.lastError) return;
      applyState(state);
      cache(state);
    });
  }
  loadAndApply();

  /* React to changes from other tabs / popup writes. */
  if (chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area !== "sync") return;
      chrome.storage.sync.get(DEFAULTS, function (state) {
        if (chrome.runtime.lastError) return;
        applyState(state);
        cache(state);
      });
    });
  }

  /* --- Live messages (popup toggle, keyboard command) --------- */
  if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(function (msg, sender, respond) {
      if (!msg || msg.type !== "SDM_APPLY") return;
      var state = Object.assign({}, DEFAULTS, msg.state || {});
      applyState(state);
      cache(state);
      if (respond) respond({ ok: true });
    });
  }
})();
