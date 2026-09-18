# BetterWorldNow

BetterWorldNow is built around a simple idea: people act on environmental sustainability more when their effort is recognized and rewarded, not just when they're informed. The site lets users learn about environmental issues through quizzes and facts, track their personal impact over time, and earn coupons and rewards from eco-friendly brands for real-world action.

## About the project

This project started as a Design of Interactive Systems (DIS) group project at IIIT Delhi, under Dr. Dhurjati Majumdar. The team ran a 116-response survey and 11 field interviews (in Nehru Place and on campus) to understand why people don't engage more with environmental action. The consistent answer was a lack of motivation and incentive, not a lack of concern — a hypothesis the team validated with a chi-squared test on the survey data. That insight shaped the whole product: a points-and-rewards system layered on top of learning content, rather than another awareness-only site.

Site features include:
- A real multi-question quiz (`pages/quiz.html`) — answering right or wrong just advances to the next question with inline feedback, no per-question redirect, plus an Exit Quiz link and a final score/results screen
- A single Facts page (`pages/facts.html`) cycling through 100+ environmental facts (`js/facts-data.js`) in randomized order, Next/Back to browse, and an Exit link — a topic icon (climate, ocean, forest, wildlife, energy, waste, water, air, food) accompanies each fact
- A leaderboard recognizing top contributors
- A blog where users share their experiences
- A profile page with a "progress tree" that animates from sapling to full-grown plant, your all-time leaderboard points total, plus an interactive, expandable list of your completed ("Done") contributions and a separate Pending list you can edit or delete (completed ones can't be — see "Theming" below)
- A coupons page redeeming points for discounts from eco-friendly brands (Nurserylive, OZIVA, Plants.com, FNP, Beco, Package Free Shop, Grove Collaborative, Patagonia, The Body Shop)
- Goal-setting for personal environmental targets (up to 4, editable) — Set Goals is the one place they live; they're not duplicated onto the Profile page
- A profile menu (top-right of every page, opens on hover) with My Profile, Settings, Help, and Sign Out (which returns to the public home page, not the login form)
- A settings page for editing account details, two-factor authentication, notification preferences, and a site-wide dark/light theme toggle — the same toggle is also reachable from every page's footer as a liquid-glass sun/moon switch (see "Theming" below)
- A "liquid glass" surface treatment (blurred, saturated, translucent panels with a specular highlight and real per-element SVG refraction) applied to cards, the nav bar, every individual nav link, inputs, and every dropdown — solid brand-green buttons get the same sheen/highlight/hover-lift treatment without losing their color
- A green "firefly" glow that eases toward the cursor on the home pages, rendered behind all page content
- A Contact page, Terms of Service, an About page, and a Forgot Password flow, plus a custom 404 page — most informational pages carry an explicit "Back to Home" link in addition to the nav
- Search on the leaderboard, filtering by name alongside the existing region/time-period filters, styled as a glass pill that widens into a real input on hover
- A swipeable deck of suggested environmental actions on the Contribute page (drag or tap to confirm/skip, via GSAP Draggable) — confirming one opens a modal requiring a proof file upload (any media type) and a description before it's logged as "Pending Review" on your Profile, where you can edit or delete it
- A full rich-text editor for drafting blog submissions (Write For Us, linked from the Blog page), built on Quill — download the draft as a standalone HTML file or email it to the team

The logo's "B" is shaped like a step, representing taking the first step toward a more sustainable future; green was chosen for its association with nature. The two blocks use a fully-rounded (not partial) right edge — see "Theming" below for why a fixed large radius was used instead of a percentage.

Team: Pratham Singhal, Siddharth Gupta, Poorvi Kumar, Yajat Gupta, Aadya (Group 7, DIS).

## Tech stack

- **Parcel** bundles the site (`pages/*.html` as entry points) and serves it locally in development.
- **Tailwind CSS** (via CDN, see each page's `<head>`) provides the utility classes for layout and the dark glassmorphism theme; shared tokens (colors, fonts) live in `css/theme.css`.
- **GSAP** (installed as a local npm dependency, bundled by Parcel via `js/animations.js`) drives the leaderboard's filter/region transitions, and — via its bundled `Draggable` plugin (`gsap/Draggable`, free since GSAP's 2024 all-plugins-free release, no separate install) — the swipeable task deck on the Contribute page. It's a normal `dependencies` entry in `package.json` — no global install needed, `npm install` picks it up automatically. Page-load fade-ins use plain CSS `@keyframes` instead (`.fade-in-up` / `.fade-in-group` in `css/theme.css`), since a GSAP-driven version left occasional stuck `transform` values on the animated element — see "Theming" below for why that matters. (An earlier GSAP-driven blooming flower bed on the Resources page was removed by request — the `js/flower-bloom.js` module is gone.)
- **Quill** (installed as a local npm dependency) provides the rich-text editor on `pages/write-blog.html`, imported directly (`import Quill from 'quill'`) with its `snow` theme CSS re-skinned in that page's own `<style>` block to match the site's dark glass surfaces instead of Quill's default light theme.
- Plain vanilla JS handles navigation, the leaderboard's filtering/sorting, the profile menu dropdown, and small interactive widgets (custom dropdowns, quiz routing) — no framework.

### Theming

Dark/light theme is driven by CSS variables in `css/theme.css` (`:root` for dark, `:root[data-theme='light']` for light), plus a small `!important` override layer that repaints the fixed-value Tailwind utility classes (`text-white`, `bg-background`, `text-brandGreen`, etc.) via those variables — necessary because Tailwind's CDN build generates literal colors, not variables. The light palette uses a soft sage tint (not plain white) for the page background, with all text/accent colors chosen to clear WCAG AA contrast against it — the dark-theme brand green/gold are too bright to read on a light background, so `--c-accent-green`/`--c-accent-gold` swap to darker values under `[data-theme='light']`. The active theme is stored in `localStorage` (`bwn-theme`) and applied both by a tiny inline script at the top of every page's `<head>` (avoids a flash of the wrong theme before Tailwind/CSS load) and by `js/animations.js` (keeps any theme toggle switch in sync). Toggle it from Settings → Appearance, or from any page's footer.

The footer toggle (`.bwn-theme-switch` in `css/theme.css`) is a pill-shaped, liquid-glass "sky" switch: a knob cross-fades between a moon (craters) and a sun (rays) as it slides across a track that morphs from a starry night gradient to a pale sky gradient, all driven by CSS transitions off `input:checked`. It's just a checkbox styled with `[data-theme-toggle]` — the same attribute the Settings toggle uses — so it needs no JS of its own; `applyTheme()`/the existing `change` listener in `js/animations.js` (see above) already keep every `[data-theme-toggle]` element on the page in sync, footer included. It sits in the footer's brand column, in the same row as the Instagram/Twitter icons (which every page's footer now shows, not just the two former "home" pages that originally had them, so the row reads consistently sitewide).

Any element that needs `position: fixed`/`absolute` popups (dropdowns, menus) should avoid sitting inside an ancestor with an animated `transform`/`filter`/`backdrop-filter` — such a property (even a lingering one left by a finished animation) makes that ancestor the containing block instead of the viewport, which silently breaks the popup's position and stacking. This is why on-load animations use CSS `animation-fill-mode: backwards` rather than `both`/`forwards` — it never leaves a residual `transform` behind. It's also why every dropdown (the contact form's topic picker included) uses `position: relative` on its own trigger wrapper plus `position: absolute` on the menu, rather than `position: fixed` with JS-computed coordinates — a `.glass-card` ancestor's `backdrop-filter` (present unconditionally, not just mid-animation) would otherwise hijack the fixed element's containing block the same way.

The `.bwn-logo`/`.bwn-logo-lg` "B" mark's two blocks use `border-radius: 0 999px 999px 0` rather than a percentage. A percentage radius scales with each block's own height, and since the two blocks are different heights, a percentage that looked right on one read as barely-rounded ("a rounded square," per feedback) on the other. A fixed value larger than either block can accommodate gets clamped by the browser to exactly half that block's height — i.e. a full semicircular edge on both, regardless of their differing sizes.

### Liquid glass surfaces

`.glass-card`, the nav bar, `.bwn-popup-menu` (every dropdown), `.bwn-input`, and the settings toggle switches all share a `--glass-blur`/`--glass-sat` backdrop-filter plus a `::before` diagonal sheen and inset-highlight/shadow box-shadow, tuned per theme via the `--c-glass-*` variables in `css/theme.css`. Interactive cards (`a.glass-card`/`button.glass-card`) also lift slightly on hover. Three things to know if you touch this:
- Only the unprefixed `backdrop-filter` is written — no `-webkit-backdrop-filter`. Parcel's CSS transform (Lightning CSS) has bundled compat data that doesn't yet know very new Chromium builds dropped support for the `-webkit-` form, and when both are present it "optimizes" by keeping only the (now-unsupported) prefixed one and silently dropping the standard property, breaking the blur entirely. Since the project's `browserslist` (in `package.json`) only targets recent evergreen browsers, the prefix isn't needed anyway.
- The sheen `::before` uses `z-index: -1`, which relies on the element establishing its own stacking context (`isolation: isolate`, and `backdrop-filter` itself also triggers one) so the sheen paints between the card's background and its real content instead of leaking behind an unrelated ancestor.
- `js/liquid-glass.js` adds real per-element refraction on top of the flat blur: it generates a small SVG `feDisplacementMap` filter sized to each `.glass-card`/`.bwn-popup-menu`/`nav` element (via `ResizeObserver`) and feeds it into that element's `backdrop-filter` through the `--lg-filter` CSS variable that `css/theme.css` already appends (`blur(...) saturate(...) var(--lg-filter, none)`). No markup changes were needed to add this — every surface already had the class. The displacement-map algorithm is adapted, with attribution in the file header, from [BeMoreDifferent/liquid-glass-js](https://github.com/BeMoreDifferent/liquid-glass-js) (MIT) — its own `<liquid-glass>` web-component API wasn't used since wrapping every existing card/menu/nav across 30+ pages in a new custom element (with its own Shadow DOM styling) would have meant a much larger, riskier rewrite than reusing just its filter-generation math against our existing classes.

### Cursor firefly (home pages only)

`index1.html` and `home-after-login.html` render a `#cursorGlow` div (`.cursor-glow` in `css/theme.css`) as the very first child of `<body>`. `js/animations.js`'s `setupCursorGlow()` eases a blurred green radial gradient toward the pointer (lerp, not 1:1) with a slow sine-wave pulse, and no-ops immediately if the div isn't present, so nothing runs on other pages.

Getting it to show only through empty background — not over text/cards/buttons — took two tries. The textbook approach is a negative `z-index` on the glow (paints behind static in-flow content per spec). That's what shipped first, and it rendered nothing at all: empirically, in this browser, a `position:fixed` element with `z-index:-1` composites as invisible rather than "behind." The fix that actually works: the glow sits at `z-index: 0`, and `main`/`footer` are explicitly promoted (`position: relative; z-index: 1`) to outrank it. Per-pixel compositing then does the right thing on its own — main/footer's opaque content (cards, text, images) paints over the glow, while their transparent gaps (the empty space around a heading, between cards) still let it show through — no per-element occlusion logic needed. Verified with cropped screenshots directly over the hero heading and over the "Join the Movement" button: both stay clean, the glow only shows in the gaps around them. (Translucent `.glass-card`s can still pick up a faint tint through their own `backdrop-filter` if the glow passes behind them — that's the glass material responding to ambient light, not the glow sitting on top of foreground content.)

### Dropdowns

Every dropdown (the nav profile menu, the leaderboard's region filter, the contact form's topic picker) opens on hover, not click — `mouseenter`/`mouseleave` on the wrapper with a short close delay (in `js/animations.js`, and inline on `pages/leaderboard.html`/`pages/contact.html`) so moving the pointer from the trigger into the menu doesn't close it.

### Editing logged deeds (Profile)

Pending contributions (`profile.pendingContributions`, in `js/animations.js`) can be edited or deleted; completed ones (`profile.doneContributions`) render through a separate, simpler template with no delete/edit controls at all — that's the actual enforcement of "you can only delete pending, not done," not a permission check. Toggling "Edit" on the pending list reveals a delete badge and an edit pencil per row. An earlier version made the rows continuously wiggle while in this mode, iOS-icon-style — it was removed because the wiggle rotates the whole `.bwn-deed-row`, which is `position: relative` and contains the absolutely-positioned delete badge as a child. Rotating the row rotates the badge's hit-area right along with it every frame, so a real click aimed at where the badge visually was could land somewhere else by the time the browser processed it. If a similar per-row affordance gets added back, keep any interactive absolutely-positioned children *outside* whatever element is being transformed.

## Running locally

Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

To preview and run the project on your device:
1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2) In the terminal, run `npm install`
3) Run `npm start` to view project in browser
