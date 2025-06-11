# Contributing to Intlayer

## Understanding the project

To understand the project, you can read the [documentation named "How Intlayer Works"](https://github.com/aymericzip/intlayer/blob/main/docs/en/how_works_intlayer.md).

## Development setup

Intlayer is developed as a mono-repo using pnpm.

### Cloning

```sh
git clone git@github.com:intlayer-org/intlayer.git
```

#### Installing packages manager

```sh
npm i -g pnpm@10.12.1
```

#### Installing Dependencies

```sh
pnpm install --filter '!./examples/**'
```

The `--filter '!./examples/\*\*'` argument in pnpm install is used to exclude all packages within the examples directory from being installed. This is necessary to avoid installing dependencies for example projects that you are not currently working on, which can save time and disk space by only installing the essential packages needed for your specific development task.

##### Tips

If you're only working on a specific example (`vite-react-app`, `nextjs-14-app`, etc.), you can install only the necessary dependencies.  
This prevents installing docs, backend apps, and all other frameworks you're not working with.

✅ Example: Install only the root package, utils, `react-intlayer`, and the `vite-react-app` example

```bash
pnpm install \
  -F . \
  -F ./utils/ts-config \
  -F ./utils/ts-config-types \
  -F ./utils/tsup-config \
  -F ./utils/eslint-config \
  -F ./packages/react-intlayer \
  -F ./examples/vite-react-app
```

> 📦 `-F` is the short form for `--filter`, used to limit installation to selected packages only.

##### Packages List

###### Core repository

- `.` (root `package.json`)
- `utils/ts-config`
- `utils/ts-config-types`
- `utils/tsup-config`
- `utils/eslint-config`

###### Official Packages

- `packages/svelte-intlayer`
- `packages/solid-intlayer`
- `packages/vite-intlayer`
- `packages/vue-intlayer`
- `packages/express-intlayer`
- `packages/preact-intlayer`
- `packages/react-scripts-intlayer`
- `packages/angular-intlayer`
- `packages/react-native-intlayer`
- `packages/intlayer`
- `packages/next-intlayer`
- `packages/lynx-intlayer`
- `packages/react-intlayer`
- `packages/intlayer-editor`
- `packages/intlayer-cli`

###### Intlayer Internal Packages (`@intlayer/`)

- `packages/@intlayer/core`
- `packages/@intlayer/config`
- `packages/@intlayer/chokidar`
- `packages/@intlayer/dictionaries-entry`
- `packages/@intlayer/cli`
- `packages/@intlayer/editor-react`
- `packages/@intlayer/webpack`
- `packages/@intlayer/api`
- `packages/@intlayer/design-system`
- `packages/@intlayer/editor`

###### ⚡ Applications

- `apps/website`
- `apps/backend`

###### Documentation & Blog

- `docs/`
- `blog/`

###### Examples

- `examples/vite-solid-app`
- `examples/react-app`
- `examples/vite-vue-app`
- `examples/vite-svelte-app`
- `examples/vite-preact-app`
- `examples/vite-react-app`
- `examples/react-native-app`
- `examples/express-app`
- `examples/cli/`
- `examples/nextjs-14-app`
- `examples/nextjs-15-app`

### Development mode

> If you're working on a new package, ensure this pacakge is listed in the `packageBuildOrder` array in `scripts/package-build-order.mjs`.

```sh
# Start development mode for all packages
# Watch the change related to each files. If the modified file is included in a package, the package will be rebuilt
pnpm dev
```

```sh
# Start development mode for selected packages or apps
# This command allow to pick the packages to execute in watch-mode, avoid conflicts, and optimize performances during development
pnpm dev:pick
```

### Building pacakges

> If you're working on a new package, ensure this pacakge is listed in the `packageBuildOrder` array in `scripts/package-build-order.mjs`.

```sh
# Build all packages
pnpm build
```

```sh
# Select a package and build it
pnpm build:pick
```

```sh
# Detect all packages that include changes using git, and build them
pnpm build:changes
```

### Reset the source

> If you're working on a new package, ensure this pacakge is listed in the `packageBuildOrder` array in `scripts/package-build-order.mjs`.

If you meet problems with the build, you can use the command `pnpm clean` to remove the dist folders of the packages.

The following commands clean the packages output folders for then build them again.

```sh
# Reset all packages
pnpm reset
```

```sh
# Select a package and reset it
pnpm reset:pick
```

```sh
# Detect all packages that include changes using git, and reset them
pnpm reset:changes
```

### Setup environment variables

For each project necessitating environment variables, like `@intlayer/backend`, you can find a `.env.template` file in the root of the project. Copy the file and rename it to `.env`. Then, fill the variables with the correct values.

For specific environment, use `.env.local`, `.env.[environment]` or `.env.[environment].local` files.

### Commit formatting

We follow a conventional commit format to make our Git history cleaner and more readable. Each commit message should follow the pattern:

```
<type>(<scope>): <message>
```

- `<type>`: One of the allowed types listed below.
- `<scope>` (optional): Can be a package name, app name, or a general scope.
- `<message>`: A clear, concise description of the change.

#### Common types

- `feat`: New features or capabilities
- `fix`: Bug fixes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `style`: Code style changes (formatting, spacing, etc.)
- `chore`: Routine tasks (e.g., updates to lockfiles or CI)
- `doc`: Documentation changes only
- `test`: Adding or updating tests
- `perf`: Performance improvements
- `build`: Changes affecting the build system or dependencies
- `ci`: Changes to CI configuration or scripts

#### Examples

```sh
feat(next-intlayer): add version comparison utility and integrate deepmerge for configuration management
fix(website): fix 404 layout
feat(solid-intlayer): prepare solid and preact intlayer
doc: fix anchors
chore: update lockfile
```

Maintaining this format helps ensure consistent, readable commit history and is also necessary for automated tools like [changesets](https://github.com/changesets/changesets) to work correctly.

### Release and PR

> Dont works properly. Need to fix it.

This repo uses [changesets](https://github.com/changesets/changesets) to
make releasing updates easier.

Use the command `pnpm changeset` to indicate what packages should have a major/minor/patch bump. A changeset is asked in your PR, and can also be added using github changeset bot.

Once a changeset present, run the command `pnpm changeset:version` to increment the related packages version. Recommended commit name : `chore(release): version packages`.

If new version of packages are referenced, and you're a maintainer, the command `pnpm changeset:publish` is dedicated to the packages release.

Note: the versioning and the publication are automatically managed by the CI/CD.
