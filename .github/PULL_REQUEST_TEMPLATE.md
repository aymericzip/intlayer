# Pull Request Guidelines

Thank you for contributing to the project! Please make sure your pull request follows these guidelines before submission.

---

## Requirements

- **AI-generated code must be reviewed.**  
  Tips to identify AI-generated code:
  - Verbose or redundant JSDoc — make JSDoc synthetic and concise.
  - Abbreviations in variables or functions (e.g., `d` instead of `dictionary`) — avoid abbreviations.
  - Overly compact code — add line breaks and spacing to improve readability.

- **Tests and build must pass** before requesting a review.

- **Commits must follow the [Conventional Commit](https://www.conventionalcommits.org/) format.**

- **The [`CONTRIBUTING.md`](./CONTRIBUTING.md)** file must be read before submitting a PR.

---

## Codebase Conventions

- Prefer **arrow functions** (`() => {}`) over function declarations (`function () {}`).
- Prefer **TypeScript `type`** over `interface`.  
  Use `interface` only for **module augmentation**.
- For better testing and reusability, prefer **one function per file**.
- Prefer **`??`** over **`||`** syntax.
- Prefer **`import type`** over `import` for type imports.
- Prefer named exports over default exports.
- Avoid abbreviations in variable names:
  - `locale` instead of `loc`
  - `map(dictionary => dictionary.key)` instead of `map(d => d.key)`
