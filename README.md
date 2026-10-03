# ChoCo documentation site

The [ChoCo](https://github.com/enric0r/ChoCo) site is built with Hugo Extended and a small custom theme in `layouts/` and `static/css/`. The handbook is one Markdown page at `content/docs/_index.md`; its section links appear in the sidebar.

## Preview locally

Install Hugo Extended 0.154.1, then run:

```sh
hugo server --renderToMemory
```

Hugo prints the local preview URL. The browser reloads after edits. For a production build:

```sh
hugo --gc --minify --destination site
```

`site/` and Hugo's default `public/` output are ignored by Git. The deploy workflow publishes only `site/`.

## Publish

The GitHub Actions workflow publishes `site/` after a push to `main` when GitHub Pages is configured to use **GitHub Actions** as its source. It uses the Pages URL supplied by `actions/configure-pages`. The fallback URL in `config/_default/hugo.toml` is used for manual builds.

When controls, pin mappings, or firmware behavior change in the ChoCo repository, update the relevant section in `content/docs/_index.md`.
