/**
 * Per-element SVG refraction filter for glass surfaces.
 *
 * The displacement-map/feDisplacementMap technique here is adapted from
 * BeMoreDifferent/liquid-glass-js (MIT License):
 * https://github.com/BeMoreDifferent/liquid-glass-js
 *
 * Rather than adopting that library's <liquid-glass> custom element (which
 * would mean wrapping every existing .glass-card/.bwn-popup-menu/nav usage
 * across the site in a new tag), this reuses just its filter-generation
 * algorithm and drives it through the --lg-filter CSS variable that
 * css/theme.css already appends to each surface's backdrop-filter list —
 * so the existing markup and theme variables are untouched.
 */
(function () {
  var SELECTOR = '.glass-card, .bwn-popup-menu, nav';

  function supportsAdvancedFilters() {
    try {
      return CSS.supports('backdrop-filter', 'url(#x)');
    } catch (e) {
      return false;
    }
  }

  function displacementMapUri(id, width, height, radius, depth) {
    var svg =
      '<svg height="' + height + '" width="' + width + '" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">' +
      '<style>.mix{mix-blend-mode:screen}</style>' +
      '<defs>' +
      '<linearGradient id="Y-' + id + '" x1="0" x2="0" y1="' + Math.ceil((radius / height) * 15) + '%" y2="' + Math.floor(100 - (radius / height) * 15) + '%">' +
      '<stop offset="0%" stop-color="#0F0"/><stop offset="100%" stop-color="#000"/></linearGradient>' +
      '<linearGradient id="X-' + id + '" x1="' + Math.ceil((radius / width) * 15) + '%" x2="' + Math.floor(100 - (radius / width) * 15) + '%" y1="0" y2="0">' +
      '<stop offset="0%" stop-color="#F00"/><stop offset="100%" stop-color="#000"/></linearGradient>' +
      '</defs>' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="#808080"/>' +
      '<g filter="blur(2px)">' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="#000080"/>' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="url(#Y-' + id + ')" class="mix"/>' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="url(#X-' + id + ')" class="mix"/>' +
      '<rect x="' + depth + '" y="' + depth + '" height="' + (height - 2 * depth) + '" width="' + (width - 2 * depth) + '" fill="#808080" rx="' + radius + '" ry="' + radius + '" filter="blur(' + depth + 'px)"/>' +
      '</g></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function displacementFilterUrl(id, width, height, radius, depth, strength) {
    var mapUri = displacementMapUri(id, width, height, radius, depth);
    var svg =
      '<svg height="' + height + '" width="' + width + '" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><filter id="displace-' + id + '" color-interpolation-filters="sRGB">' +
      '<feImage x="0" y="0" height="' + height + '" width="' + width + '" href="' + mapUri + '" result="displacementMap"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="' + strength + '" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '#displace-' + id;
  }

  function run() {
    if (!supportsAdvancedFilters()) return;

    var counter = 0;
    var pending = new Set();
    var raf = null;

    function flush() {
      raf = null;
      pending.forEach(update);
      pending.clear();
    }

    function schedule(el) {
      pending.add(el);
      if (!raf) raf = requestAnimationFrame(flush);
    }

    function update(el) {
      var rect = el.getBoundingClientRect();
      var width = Math.round(rect.width);
      var height = Math.round(rect.height);
      if (!width || !height) return;

      var key = width + 'x' + height;
      if (el.dataset.lgKey === key) return;
      el.dataset.lgKey = key;

      if (!el.dataset.lgId) {
        el.dataset.lgId = 'lg' + counter++;
      }

      var parsedRadius = parseFloat(getComputedStyle(el).borderRadius);
      var maxRadius = Math.min(width, height) / 2;
      var radius = isNaN(parsedRadius) ? 16 : Math.min(parsedRadius, maxRadius);
      var depth = Math.max(4, Math.min(14, Math.round(Math.min(width, height) * 0.04)));
      var strength = 28;

      var url = displacementFilterUrl(el.dataset.lgId, width, height, radius, depth, strength);
      el.style.setProperty('--lg-filter', "url('" + url + "')");
    }

    var observer = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        schedule(entry.target);
      });
    });

    document.querySelectorAll(SELECTOR).forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
