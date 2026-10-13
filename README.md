# NES Calculator 🎮

A retro-styled calculator with the look and feel of the Nintendo Entertainment System, built with [Preact](https://preactjs.com), [NES.css](https://nostalgic-css.github.io/NES.css/) and [Vite](https://vite.dev).

## Features

- Classic NES pixel-art UI
- Basic arithmetic: `+`, `-`, `x`, `/`
- `ANS` key to reuse the last result
- Physical keyboard support: digits, `.`, `+` `-` `x` `/`, `Enter`/`=` to calculate, `Backspace`, `Esc` to clear
- Invalid expressions show `ERROR` instead of crashing
- Long expressions scroll automatically in the display

## Development

This project pins its Node version with [mise](https://mise.jdx.dev) (see [`mise.toml`](mise.toml)).

```sh
mise install
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production build lands in `dist/` and uses relative asset paths, so it works from any path (including GitHub Pages project sites).

## Deploy

Pushing to `main` triggers the [`build-and-deploy`](.github/workflows/deploy.yml) workflow, which builds the app and publishes `dist/` to the `gh-pages` branch. Make sure GitHub Pages is configured to serve from the `gh-pages` branch in the repository settings.

## License

See [LICENSE.txt](LICENSE.txt).
