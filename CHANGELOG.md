# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive SEO update (`robots.txt`, `sitemap.xml`, `manifest.json`, absolute `og:image`, `canonical` URLs).
- Performance upgrades: `font-display: swap`, loading techniques, CSS resets, AbortController with 8s timeout for data fetching.
- Print media styling (`css/print.css`).
- OS-level theme preference fallback using `prefers-color-scheme`.
- Dynamic Skeleton Loader mimicking terminal behavior while fetching data in `projects.js`.
- Mobile smooth-scroll section indicators.
- New pages: `/uses` detailing hardware and software, and an under-construction `/blog`.
- Standardization files: `.gitignore`, `package.json`, `_headers`.

### Changed
- Converted monolithic JS to a modular structure (`core/`, `components/`, `effects/`).
- Moved project lists strictly into `data/projects.json`.
- Modified visual feedback strings & retro UI elements.

## [1.0.0] - 2026-04-14
### Added
- Initial project refactor setup featuring Brutalist Retro Pixel theme.
- Dynamic interactive features like gravity-particle fireworks.
