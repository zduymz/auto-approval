// contentScript.js
(function() {
  /**
   * Attempts to find the target button by ID or data-testid.
   * @returns {HTMLElement|null}
   */
  function findTargetButton() {
    return document.getElementById('cli_verification_btn')
        || document.querySelector('[data-testid="allow-access-button"]');
  }

  /**
   * Clicks the given button and logs an appropriate message.
   * @param {HTMLElement} btn
   */
  function clickButton(btn) {
    btn.click();
    const id = btn.id || btn.getAttribute('data-testid');
    console.log(`[AWSApps CLI Verifier] Button clicked: ${id}`);
  }

  /**
   * Try to find and click the button immediately.
   * @returns {boolean} true if clicked
   */
  function tryImmediateClick() {
    const btn = findTargetButton();
    if (btn) {
      clickButton(btn);
      return true;
    }
    return false;
  }

  // Immediate attempt
  if (tryImmediateClick()) return;

  // Observe DOM for dynamic injection
  const observer = new MutationObserver((mutations, obs) => {
    const btn = findTargetButton();
    if (btn) {
      clickButton(btn);
      obs.disconnect();
      clearInterval(intervalId);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Poll as a fallback
  const intervalId = setInterval(() => {
    if (tryImmediateClick()) {
      clearInterval(intervalId);
      observer.disconnect();
    }
  }, 500);
})();
