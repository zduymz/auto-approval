// contentScript.js
(function() {
  let lastClicked = null;

  /**
   * Attempts to find the target button by ID or data-testid.
   * @returns {HTMLElement|null}
   */
  function findTargetButton() {
    return document.getElementById('cli_verification_btn')
        || document.querySelector('[data-testid="allow-access-button"]');
  }

  /**
   * Clicks the given button if it hasn't been clicked already.
   * @param {HTMLElement} btn
   */
  function clickButton(btn) {
    if (btn === lastClicked) return;
    btn.click();
    lastClicked = btn;
    const id = btn.id || btn.getAttribute('data-testid');
    console.log(`[AWSApps CLI Verifier] Button clicked: ${id}`);
  }

  /**
   * Checks for success alert and closes window if found.
   */
  function checkSuccessAndClose() {
    const alertDiv = document.querySelector('[data-analytics-alert="success"]');
    if (alertDiv) {
      console.log('[AWSApps CLI Verifier] Success alert detected. Closing window.');
      window.close();
    }
  }

  /**
   * Main check: find and click target button, then schedule success check after 5 seconds.
   */
  function checkAndAct() {
    const btn = findTargetButton();
    if (btn) clickButton(btn);
    // Delay closing check by 5 seconds
    setTimeout(checkSuccessAndClose, 5000);
  }

  // Initial run
  checkAndAct();

  // Re-run on DOM mutations
  const observer = new MutationObserver(checkAndAct);
  observer.observe(document.body, { childList: true, subtree: true });

  // Listen for SPA navigation events
  const origPush = history.pushState;
  history.pushState = function(...args) {
    origPush.apply(this, args);
    setTimeout(checkAndAct, 100);
  };
  const origReplace = history.replaceState;
  history.replaceState = function(...args) {
    origReplace.apply(this, args);
    setTimeout(checkAndAct, 100);
  };
  window.addEventListener('popstate', () => setTimeout(checkAndAct, 100));
})();