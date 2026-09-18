import { gsap } from 'gsap';

window.BWN = window.BWN || {};
window.BWN.gsap = gsap;

window.BWN.fadeSwap = function (container, renderFn) {
  gsap.to(container, {
    opacity: 0,
    duration: 0.15,
    ease: 'power1.in',
    onComplete: function () {
      renderFn();
      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power1.out' }
      );
    },
  });
};

var THEME_KEY = 'bwn-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (input) {
    input.checked = theme === 'light';
  });
}

window.BWN.getTheme = function () {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch (e) {
    return 'dark';
  }
};

window.BWN.setTheme = function (theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
  applyTheme(theme);
};

function setupProfileDropdown() {
  var trigger = document.querySelector('nav a[href$="profile.html"]');
  if (!trigger || trigger.dataset.dropdownReady) return;
  trigger.dataset.dropdownReady = '1';

  var basePath = trigger.getAttribute('href').replace(/profile\.html.*$/, '');
  var path = location.pathname;
  var onProfile = /\/profile\.html$/.test(path);
  var onSettings = /\/settings\.html$/.test(path);
  var onHelp = /\/help\.html$/.test(path);

  var wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.style.display = 'inline-flex';
  trigger.parentNode.insertBefore(wrap, trigger);
  wrap.appendChild(trigger);

  var menu = document.createElement('div');
  menu.className = 'hidden bwn-popup-menu bwn-nav-popup py-1';
  menu.innerHTML =
    '<a href="' + basePath + 'profile.html" class="bwn-popup-item' + (onProfile ? ' active' : '') + '">' +
    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>My Profile</a>' +
    '<a href="' + basePath + 'settings.html" class="bwn-popup-item' + (onSettings ? ' active' : '') + '">' +
    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>Settings</a>' +
    '<a href="' + basePath + 'help.html" class="bwn-popup-item' + (onHelp ? ' active' : '') + '">' +
    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="2"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 9.5a2.5 2.5 0 115 .5c0 1.5-2.5 1.5-2.5 3.5M12 17h.01"></path></svg>Help</a>' +
    '<div style="height:1px;margin:0.25rem 0;background:var(--c-border-1);"></div>' +
    '<button type="button" class="bwn-popup-item bwn-popup-item-danger">' +
    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>Sign Out</button>';
  wrap.appendChild(menu);

  var signOutBtn = menu.querySelector('.bwn-popup-item-danger');
  signOutBtn.addEventListener('click', function () {
    window.location.href = basePath + 'index1.html';
  });

  var closeTimer = null;

  function open() {
    clearTimeout(closeTimer);
    menu.classList.remove('hidden');
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      menu.classList.add('hidden');
    }, 150);
  }

  wrap.addEventListener('mouseenter', open);
  wrap.addEventListener('mouseleave', scheduleClose);
}

var PROFILE_KEY = 'bwn-profile';
var DEFAULT_PROFILE = {
  username: 'beyondpratham',
  email: 'beyondpratham@gmail.com',
  dob: 'December 22, 2003',
  country: 'India',
  avatar: 'https://github.com/beyondpratham.png',
  points: 902037,
  twoFactor: false,
  notifyEmail: true,
  notifyDigest: false,
  pendingContributions: [],
  doneContributions: [
    {
      id: 'done-1',
      title: 'Planted 5 Peepal tree saplings near Dwarka',
      description:
        'Planted 5 peepal tree saplings near Dwarka. Several school children also participated in the drive. Local society guards took the responsibility to take care of the saplings for better growth.',
      image: '../images/image-8@2x.png',
      points: 120,
      approvedAt: '2026-08-14T00:00:00.000Z',
    },
    {
      id: 'done-2',
      title: 'Carrying my own bag when I go out!',
      description:
        'I always carry my own bag when I go out for buying anything. Avoiding plastic use and throwaway bags can be a big step towards reducing pollution.',
      image: '../images/image-9@2x.png',
      points: 40,
      approvedAt: '2026-07-02T00:00:00.000Z',
    },
  ],
  goals: [],
};

window.BWN.addPendingContribution = function (task) {
  var profile = window.BWN.getProfile();
  var list = (profile.pendingContributions || []).slice();
  list.unshift({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title: task.title,
    points: task.points,
    proofName: task.proofName || '',
    proofPreview: task.proofPreview || null,
    description: task.description || '',
    loggedAt: new Date().toISOString(),
  });
  window.BWN.saveProfile({ pendingContributions: list });
};

window.BWN.updatePendingContribution = function (id, patch) {
  var profile = window.BWN.getProfile();
  var list = (profile.pendingContributions || []).map(function (item) {
    return item.id === id ? Object.assign({}, item, patch) : item;
  });
  window.BWN.saveProfile({ pendingContributions: list });
};

window.BWN.deletePendingContribution = function (id) {
  var profile = window.BWN.getProfile();
  var list = (profile.pendingContributions || []).filter(function (item) {
    return item.id !== id;
  });
  window.BWN.saveProfile({ pendingContributions: list });
};

window.BWN.getProfile = function () {
  try {
    var raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return Object.assign({}, DEFAULT_PROFILE, JSON.parse(raw));
  } catch (e) {}
  return Object.assign({}, DEFAULT_PROFILE);
};

window.BWN.saveProfile = function (patch) {
  var next = Object.assign({}, window.BWN.getProfile(), patch);
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  } catch (e) {}
  applyProfileToDom();
  return next;
};

function applyProfileToDom() {
  var profile = window.BWN.getProfile();
  document.querySelectorAll('[data-profile-field]').forEach(function (el) {
    var field = el.dataset.profileField;
    if (!(field in profile)) return;
    if (el.tagName === 'IMG') el.src = profile[field];
    else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = profile[field];
    else el.textContent = profile[field];
  });
  document.querySelectorAll('[data-profile-toggle]').forEach(function (input) {
    var field = input.dataset.profileToggle;
    if (field in profile) input.checked = !!profile[field];
  });

  document.querySelectorAll('[data-profile-points]').forEach(function (el) {
    el.textContent = (profile.points || 0).toLocaleString('en-IN');
  });

  var list = document.querySelector('[data-profile-list="pendingContributions"]');
  if (list) {
    var items = profile.pendingContributions || [];
    var empty = document.querySelector('[data-profile-list-empty="pendingContributions"]');
    if (empty) empty.classList.toggle('hidden', items.length > 0);
    list.innerHTML = items
      .map(function (item) {
        var date = new Date(item.loggedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        return (
          '<div class="bwn-deed-row relative flex items-start justify-between gap-4 py-3 border-b border-white/5" data-contribution-id="' + item.id + '">' +
          '<button type="button" class="bwn-deed-delete" data-delete-id="' + item.id + '" aria-label="Delete">' +
          '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>' +
          '</button>' +
          (item.proofPreview ? '<img src="' + item.proofPreview + '" alt="" class="w-12 h-12 rounded-lg object-cover shrink-0" />' : '') +
          '<div class="min-w-0 flex-1">' +
          '<div class="font-medium">' + escapeHtml(item.title) + '</div>' +
          (item.description ? '<div class="text-gray-400 text-sm mt-1">' + escapeHtml(item.description) + '</div>' : '') +
          (item.proofName ? '<div class="text-gray-500 text-xs mt-1">Proof: ' + escapeHtml(item.proofName) + '</div>' : '') +
          '<div class="text-gray-400 text-xs mt-1">Logged ' + date + '</div>' +
          '</div>' +
          '<div class="flex items-center gap-3 shrink-0">' +
          '<span class="text-brandGold text-sm font-semibold">+' + item.points + ' pts</span>' +
          '<button type="button" class="bwn-deed-edit" data-edit-id="' + item.id + '" aria-label="Edit">' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' +
          '</button>' +
          '<span class="text-[10px] font-semibold uppercase tracking-wide text-gray-400 border border-white/10 rounded-full px-2 py-1">Pending Review</span>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  var doneList = document.querySelector('[data-profile-list="doneContributions"]');
  if (doneList) {
    var doneItems = profile.doneContributions || [];
    var doneEmpty = document.querySelector('[data-profile-list-empty="doneContributions"]');
    if (doneEmpty) doneEmpty.classList.toggle('hidden', doneItems.length > 0);
    doneList.innerHTML = doneItems
      .map(function (item) {
        var date = new Date(item.approvedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        return (
          '<button type="button" class="bwn-done-card glass-card p-6 text-left w-full transition-colors hover:bg-surfaceHover" data-toggle-done-id="' + item.id + '">' +
          '<div class="flex items-center gap-4">' +
          (item.image ? '<img src="' + item.image + '" alt="" class="w-16 h-16 rounded-lg object-cover shrink-0" />' : '') +
          '<div class="min-w-0 flex-1">' +
          '<span class="text-brandGold text-xs font-semibold uppercase tracking-wide">Approved &middot; ' + date + '</span>' +
          '<h3 class="font-bold mt-1">' + escapeHtml(item.title) + '</h3>' +
          '</div>' +
          '<span class="text-brandGreen text-sm font-semibold shrink-0">+' + item.points + ' pts</span>' +
          '<svg class="bwn-done-chevron w-4 h-4 text-gray-400 shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>' +
          '</div>' +
          '<p class="bwn-done-detail text-gray-400 text-sm leading-relaxed mt-4 hidden">' + escapeHtml(item.description) + '</p>' +
          '</button>'
        );
      })
      .join('');
  }
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setupProfileForms() {
  document.addEventListener('click', function (e) {
    var card = e.target.closest('[data-toggle-done-id]');
    if (!card) return;
    var detail = card.querySelector('.bwn-done-detail');
    var chevron = card.querySelector('.bwn-done-chevron');
    if (!detail) return;
    detail.classList.toggle('hidden');
    if (chevron) chevron.style.transform = detail.classList.contains('hidden') ? '' : 'rotate(180deg)';
  });

  document.querySelectorAll('[data-profile-toggle]').forEach(function (input) {
    input.addEventListener('change', function () {
      var patch = {};
      patch[input.dataset.profileToggle] = input.checked;
      window.BWN.saveProfile(patch);
    });
  });

  document.querySelectorAll('[data-profile-save]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var scope = btn.closest('[data-profile-scope]') || document;
      if (scope.reportValidity && !scope.reportValidity()) return;
      var patch = {};
      scope.querySelectorAll('[data-profile-field]').forEach(function (el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          patch[el.dataset.profileField] = el.value;
        }
      });
      window.BWN.saveProfile(patch);
      if (btn.dataset.savedLabel) {
        var original = btn.textContent;
        btn.textContent = btn.dataset.savedLabel;
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 1500);
      }
    });
  });
}

function setupCursorGlow() {
  var glow = document.getElementById('cursorGlow');
  if (!glow) return;

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var curX = targetX;
  var curY = targetY;
  var start = performance.now();

  document.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', function () {
    glow.classList.remove('active');
  });

  function frame(now) {
    curX += (targetX - curX) * 0.09;
    curY += (targetY - curY) * 0.09;
    var pulse = 1 + Math.sin((now - start) / 850) * 0.07;
    glow.style.transform = 'translate3d(' + curX.toFixed(1) + 'px,' + curY.toFixed(1) + 'px,0) scale(' + pulse.toFixed(3) + ')';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function init() {
  applyTheme(window.BWN.getTheme());
  setupProfileDropdown();
  applyProfileToDom();
  setupProfileForms();
  setupCursorGlow();
  document.querySelectorAll('[data-theme-toggle]').forEach(function (input) {
    input.addEventListener('change', function () {
      window.BWN.setTheme(input.checked ? 'light' : 'dark');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
