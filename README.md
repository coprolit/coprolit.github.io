# Bolt Action side mission generator

## How to add a new mission

1. Go to `/src/pages`
2. Add a new `.svelte` file, e.g. `mission-no-retreat.svelte` (important: name **must** include the string `mission`).
3. Add content (mission title, introductory intel fluff, objective and victory condition text).
4. Commit directly to the master branch.
5. Wait a few seconds for Github to build a new web app, then check result on https://coprolit.github.io/. 

## Tech setup

This is a Jamstack app, build with Svelte.

### CI/CD
Any push to `master` triggers a Github Action (see `/.github/workflows/publish.yaml`) that
1. runs a new, pre-rendered build of the app with current content,
2. commits output to a `gh-pages` branch,
3. from where it is directly deployed to GitHub Pages: https://coprolit.github.io/.
