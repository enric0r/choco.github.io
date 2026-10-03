# ChoCo documentation site

This repository contains the [ChoCo](https://github.com/enric0r/ChoCo) documentation site. It uses [Hugo](https://gohugo.io/) and the Blowfish theme as a Go module. Source pages are in `content/`; the deploy workflow is `.github/workflows/hugo.yaml`.

## Local preview

Install Hugo Extended 0.154.1 and Go 1.25.5, then run:

```sh
hugo server
```

Open the local URL printed by Hugo. To check the production build:

```sh
hugo --gc --minify --destination site
```

`site/` is generated output and is ignored by Git. The older tracked `public/` directory is not used by the deploy workflow.

## Deployment

The GitHub Actions workflow builds and publishes the site on pushes to `main` when GitHub Pages is configured to use **GitHub Actions** as its source. The workflow obtains the actual Pages URL from `actions/configure-pages`; the URL in `config/_default/hugo.toml` is a fallback for manual builds. If Pages is not enabled yet, configure it under the repository's **Settings → Pages**.

The documentation describes the current ChoCo firmware source. When changing controls, pin mappings, or build behavior in the firmware repository, update the matching page here too.
