// Under the Cipher — shared script
// 1) Decrypt-style reveal for elements marked [data-decode]
// 2) Optional legend show/hide toggle on article pages

(function () {
  var GLYPHS = "01#$%&*+=?/\\<>";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function decode(el) {
    var final = el.textContent;
    if (reduceMotion) return; // leave static text as-is

    var frames = 14;
    var current = 0;
    el.setAttribute("aria-label", final);

    var interval = setInterval(function () {
      var out = "";
      for (var i = 0; i < final.length; i++) {
        var ch = final[i];
        if (ch === " ") { out += " "; continue; }
        var revealPoint = (i / final.length) * frames;
        if (current >= revealPoint + 4) {
          out += ch;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      el.textContent = out;
      current++;
      if (current > frames + 4) {
        el.textContent = final;
        clearInterval(interval);
      }
    }, 45);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-decode]").forEach(decode);

    var toggle = document.querySelector("[data-legend-toggle]");
    var legend = document.querySelector("[data-legend]");
    if (toggle && legend) {
      toggle.addEventListener("click", function () {
        var isHidden = legend.hasAttribute("hidden");
        if (isHidden) {
          legend.removeAttribute("hidden");
          toggle.textContent = "Hide key";
        } else {
          legend.setAttribute("hidden", "");
          toggle.textContent = "Fact / theory key";
        }
      });
    }
  });
})();
