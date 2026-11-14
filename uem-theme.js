/*
 * Light/dark switch for status.uem.edu.in.
 *
 * With no saved choice the page follows the system setting. Clicking the
 * switch saves "light" or "dark" and sets data-theme on <html>, which
 * uem-theme.css reads. An inline script set in .upptimerc.yml (`js`) applies
 * the saved choice before first paint; this file adds the switch to the header.
 */
(function () {
  var KEY = "uem-theme";
  var root = document.documentElement;
  var memo = null; // fallback when storage is blocked
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function saved() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === "light" || v === "dark") return v;
    } catch (e) {}
    return memo;
  }

  function current() {
    return saved() || (media && media.matches ? "dark" : "light");
  }

  function apply() {
    var choice = saved();
    if (choice) root.setAttribute("data-theme", choice);
    else root.removeAttribute("data-theme");
    var btn = document.querySelector(".uem-theme-switch");
    if (btn) {
      var dark = current() === "dark";
      btn.setAttribute("aria-checked", dark ? "true" : "false");
      btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
  }

  var SUN =
    '<svg class="uem-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON =
    '<svg class="uem-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function mount() {
    var list = document.querySelector("nav ul");
    if (!list || list.querySelector(".uem-theme-switch")) return;
    var li = document.createElement("li");
    li.className = "uem-theme-item";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "uem-theme-switch";
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-label", "Dark mode");
    btn.innerHTML = '<span class="uem-knob"></span>' + SUN + MOON;
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      memo = next;
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      apply();
    });
    li.appendChild(btn);
    list.appendChild(li);
    apply();
  }

  if (media) {
    var onChange = function () {
      if (!saved()) apply();
    };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  // The page is rendered by Svelte, which can redraw the header after load
  // (hydration, page changes). Put the switch back whenever it goes missing.
  function start() {
    mount();
    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
