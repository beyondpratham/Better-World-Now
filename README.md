# BetterWorldNow

BetterWorldNow is built around a simple idea: people act on environmental sustainability more when their effort is recognized and rewarded, not just when they're informed. The site lets users learn about environmental issues through quizzes and facts, track their personal impact over time, and earn coupons and rewards from eco-friendly brands for real-world action.

## About the project

This project started as a Design of Interactive Systems (DIS) group project at IIIT Delhi, under Dr. Dhurjati Majumdar. The team ran a 116-response survey and 11 field interviews (in Nehru Place and on campus) to understand why people don't engage more with environmental action. The consistent answer was a lack of motivation and incentive, not a lack of concern — a hypothesis the team validated with a chi-squared test on the survey data. That insight shaped the whole product: a points-and-rewards system layered on top of learning content, rather than another awareness-only site.

Site features include:
- A quiz and facts section for learning about environmental topics
- A leaderboard recognizing top contributors
- A blog where users share their experiences
- A profile page with a "progress tree" that animates from sapling to full-grown plant as a visual measure of a user's contribution
- A coupons page redeeming points for discounts from eco-friendly brands (Nurserylive, OZIVA, Plants.com, FNP)
- Goal-setting for personal environmental targets

The logo's "B" is shaped like a step, representing taking the first step toward a more sustainable future; green was chosen for its association with nature.

Team: Pratham Singhal, Siddharth Gupta, Poorvi Kumar, Yajat Gupta, Aadya (Group 7, DIS).

## Tech stack

- **Parcel** bundles the site (`pages/*.html` as entry points) and serves it locally in development.
- **Tailwind CSS** (via CDN, see each page's `<head>`) provides the utility classes for layout and the dark glassmorphism theme; shared tokens (colors, fonts) live in `css/theme.css`.
- **GSAP** (installed as a local npm dependency, bundled by Parcel via `js/animations.js`) drives page-load fade-ins, staggered card reveals, and the leaderboard's filter transitions. It's a normal `dependencies` entry in `package.json` — no global install needed, `npm install` picks it up automatically.
- Plain vanilla JS handles navigation, the leaderboard's filtering/sorting, and small interactive widgets (custom dropdown, quiz routing) — no framework.

## Running locally

Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

To preview and run the project on your device:
1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2) In the terminal, run `npm install`
3) Run `npm start` to view project in browser
