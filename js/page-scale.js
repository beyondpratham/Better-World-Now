(function () {
  var DESIGN_WIDTH = 1728;
  var MIN_SCALE = 0.4;
  var MAX_SCALE = 1.6;

  var canvas = document.body.querySelector(":scope > div");
  if (!canvas) return;

  function apply() {
    var scale = window.innerWidth / DESIGN_WIDTH;
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    document.documentElement.style.setProperty("--page-scale", scale);
    document.body.style.height = Math.ceil(canvas.offsetHeight * scale) + "px";
    var canvasBg = getComputedStyle(canvas).backgroundColor;
    document.documentElement.style.backgroundColor = canvasBg;
    document.body.style.backgroundColor = canvasBg;
  }

  window.addEventListener("resize", apply);
  apply();
})();
