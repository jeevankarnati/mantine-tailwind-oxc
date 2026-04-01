# Mantine + Tailwind + Oxc

Starter for [React](https://react.dev/) apps that combine [Mantine](https://mantine.dev/) UI, [Tailwind CSS v4](https://tailwindcss.com/) (via the Vite plugin), and [Oxc](https://oxc.rs)-based tooling ([oxlint](https://oxc.rs/docs/guide/usage/linter), [oxfmt](https://oxc.rs/docs/guide/usage/formatter)).

## Stack

| Area          | Choice                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime / UI  | React 19                                                                                                                                                 |
| Build         | [Vite](https://vite.dev/) 8                                                                                                                              |
| Components    | [Mantine](https://mantine.dev/) 9 (`@mantine/core`, `@mantine/hooks`)                                                                                    |
| Styling       | Tailwind CSS 4 with `[tailwind-preset-mantine](https://github.com/songkeys/tailwind-preset-mantine)` so utilities stay aligned with Mantine theme tokens |
| Compiler      | [React Compiler](https://react.dev/learn/react-compiler) (Babel preset in `vite.config.ts`)                                                              |
| Lint / format | [oxlint](https://oxc.rs) with type-aware checks; [oxfmt](https://oxc.rs) with import sorting and Tailwind class sorting                                  |
| Types         | TypeScript (strict)                                                                                                                                      |

PostCSS is configured for Mantine’s preset and breakpoint variables (`postcss.config.cjs`), which pairs with Mantine’s CSS workflow alongside Tailwind.

## Scripts

| Script         | Description                                              |
| -------------- | -------------------------------------------------------- |
| `dev`          | Vite dev server with HMR                                 |
| `build`        | Production build to `dist/`                              |
| `preview`      | Serve the production build locally                       |
| `lint`         | Run oxlint                                               |
| `lint:fix`     | oxlint with `--fix`                                      |
| `format`       | Verify formatting with oxfmt (`--check`; CI-friendly)    |
| `format:fix`   | Apply oxfmt formatting                                   |
| `quality`      | Run `lint` then `format`                                 |
| `quality:fix`  | Run `lint:fix` then `format:fix`                         |

## Project layout

- `src/main.tsx` — `MantineProvider`, theme, and app mount
- `src/app.tsx` — root app shell
- `src/index.css` — Tailwind entry; imports `tailwind-preset-mantine`
- `src/components/` — UI components (filenames use kebab-case per oxlint)

## Path alias

Imports can use `@/` for `src/`, for example `import X from "@/components/foo"` (see `vite.config.ts` and `tsconfig.app.json`).
