# Conventional Commit Message Guidelines

This project uses **[Conventional Commits](https://www.conventionalcommits.org/)** and validates every commit with **commitlint** (see `commitlint.config.ts`).

## 1. Message Format

```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

- `<type>`: one of the **allowed types** below (lower-case)
- `<scope>` _(optional)_: a package, app, or general scope (lower-case, no spaces)
- `<subject>`: short description in the imperative mood, **no trailing period**

## 2. Length Restrictions

| Component                      | Max Length     | Rule Level |
| ------------------------------ | -------------- | ---------- |
| **Header** (entire first line) | 100 characters | Error      |
| **Body** (each line)           | 100 characters | Error      |
| **Footer** (each line)         | 100 characters | Error      |

> Exceeding these limits will cause commit validation to fail.

## 3. Allowed Types

| Type         | When to use it                                                                |
| ------------ | ----------------------------------------------------------------------------- |
| **build**    | Changes to build system, tooling, or external dependencies                    |
| **chore**    | Routine tasks (e.g., lockfile update, minor refactor with no behavior change) |
| **ci**       | CI configuration or scripts                                                   |
| **doc**      | Documentation-only changes                                                    |
| **feat**     | Introducing **new features**                                                  |
| **fix**      | **Bug fixes**                                                                 |
| **perf**     | Performance improvements                                                      |
| **refactor** | Code changes that neither fix a bug nor add a feature                         |
| **style**    | Code style changes (formatting, whitespace, etc.)                             |
| **test**     | Adding or updating tests                                                      |

> Any other type will be rejected by commitlint.

## 4. Subject Rules

- Use the **imperative mood**: "add", "fix", "remove", **not** "added" or "adding".
- Must be **lower-case** (no sentence-case, start-case, pascal-case, or upper-case).
- Don't capitalize the first letter beyond what's required for acronyms.
- Don't end with a period.
- Cannot be empty (required).

## 5. Scope Rules

- Optional but recommended for clarity.
- **Must be lower-case** (enforced by commitlint).
- Hyphen-separated if multi-word.
- Examples: `react-intlayer`, `backend`, `website`, `scripts`.

## 6. Body (Optional)

Provide context, motivation and contrast with previous behavior.

**Requirements:**

- Must have a **blank line** before the body content (warning level).
- Each line must not exceed **100 characters** (error level).

```
<type>(<scope>): <subject>
<BLANK LINE>
Detailed explanation of **what** and **why**.
Each line in the body must be 100 characters or less.
<BLANK LINE>
```

## 7. Footer (Optional)

Used for metadata such as breaking changes or issue references.

**Requirements:**

- Must have a **blank line** before the footer content (warning level).
- Each line must not exceed **100 characters** (error level).

```
<type>(<scope>): <subject>

[optional body]
<BLANK LINE>
BREAKING CHANGE: describe the breaking change here

Closes #123
```

## 8. Examples

```txt
feat(core): add version comparison utility
fix(website): correct 404 layout on nested routes
chore: update lockfile
style(backend): run eslint --fix on src directory
```

## 9. Quick Checklist

1. Correct **type** from the list above (lower-case)
2. (Optional) concise **scope** in lower-case
3. **Subject** in lower-case, imperative mood, ≤ 100 chars total header, no period
4. **Body** with blank line before, each line ≤ 100 chars
5. **Footer** with blank line before, each line ≤ 100 chars, for breaking changes/issue refs

## 10. Validation & Automation

- The `.husky/commit-msg` hook runs `pnpm exec commitlint --edit "$1"`.
- Any deviation from the rules aborts the commit **with guidance**.
- Use `git commit --amend` to fix a rejected message.

---

Following these guidelines keeps the project history clean, makes changelogs automatic, and helps everyone understand **why** a change exists.
