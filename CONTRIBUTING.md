# Contributing to Intlayer

## Understanding the project

To understand the project, you can read the [documentation named "How Intlayer Works"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/how_works_intlayer.md).

## Development setup

Intlayer is developed as a mono-repo using pnpm.

To set up the repository, you will need to follow these steps:

1. Create a Copy (Fork the repository)
2. Clone the repository
3. Install the approved version of pnpm
4. Install dependencies
5. Build packages
6. Start dev mode (to interact with packages)
7. Launch apps (to interact with frontend, CMS, online docs, etc.)

### Cloning

Add your Github Username replace **{username}**

```sh
git clone https://github.com/{username}/intlayer.git
```

or

```sh
git clone git@github.com:{username}/intlayer.git
```

#### Installing packages manager

```sh
npm install -g pnpm@10.12.1
```

#### Installing Dependencies

```sh
pnpm install:packages
```

##### Tips

Then, if you're only working on a specific example (`vite-react-app`, `nextjs-14-app`, etc.), you can install only the necessary dependencies.  
This prevents installing docs, backend apps, and all other frameworks you're not working with.

Example: Install only the `vite-react-app` example

```bash
pnpm install  -F ./examples/vite-react-app
```

> `-F` is the short form for `--filter`, used to limit installation to selected packages only.

The `--filter '!./examples/\*\*'` argument in pnpm install is used to exclude all packages within the examples directory from being installed.

##### Packages List

To understand the interest of all packages, you can read the [documentation named "How Intlayer Works"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/how_works_intlayer.md).

### Building pacakges

> The repo use turborepo to optimize the building process.

Look at the application that you want to contribute to, and build it with the following example commands:

```sh
# Build website and all related packages
pnpm turbo run build --filter=./apps/website
```

```sh
# Build vite-react-app example app and all related packages
pnpm turbo run build --filter=./examples/vite-react-app
```

Or if you want to build all packages, you can use the following command:

```sh
# Build all packages (clean dist folders, and build packages)
pnpm build
```

> ⏱️ On Github Actions, building all packages usualy take around 2 to 4 minutes.
> ⏱️ On old environment, building all packages can be really slow and can take more than 10 minutes.

To pick a package and build it, without having to navigate in the repository, you can use the following command:

```sh
# Select a package and build it (clean dist folder, and build package)
pnpm build:pick
```

### Development mode

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

### Setup environment variables

For each project necessitating environment variables, like `@intlayer/backend`, you can find a `.env.template` file in the root of the project. Copy the file and rename it to `.env`. Then, fill the variables with the correct values.

For specific environment, use `.env.local`, `.env.[environment]` or `.env.[environment].local` files.

## Starting an application

For applications locates in `apps/` folder, as well as example applications locates in `examples/` folder, you can start them with the following command:

```sh
cd ./apps/backend # or ./apps/website, ./examples/nextjs-15-app, etc.
pnpm dev # or pnpm dev:turbo, etc.
```

> Adapt the path to the application you want to start.
> See the application `package.json` to check the command to start it. Example for nextjs-15-app: `pnpm dev:turbo` is the most efficient command to start the dev server.
> If you filtered some applications during the installation, do not forget to add the related dependencies using the install command (Example: `pnpm install --filter './examples/nextjs-15-app'`).

## Includes a new package

> If you're working on a new package, ensure this pacakge is listed in the `packageBuildOrder` array in `scripts/package-build-order.mjs`.

## Codebase conventions

- Prefer arrow function (`() => {}`) over function declaration (`function () {}`).
- Prefer TypeScript `type` over `interface`. Use `interface` for modules augmentation only.
- For testing and reusability, prefer 1 function per file.
- Prefer `??` over `||` syntax.
- Prefer `import type` over `import` for type imports.

## Commit formatting

We follow a conventional commit format to make our Git history cleaner and more readable. Each commit message should follow the pattern:

```
<type>(<scope>): <message>
```

- `<type>`: One of the allowed types listed below.
- `<scope>` (optional): Can be a package name, app name, or a general scope.
- `<message>`: A clear, concise description of the change.

### Common types

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

### Examples of commit messages

```txt
feat(next-intlayer): add version comparison utility and integrate deepmerge for configuration management
fix(website): fix 404 layout
feat(solid-intlayer): prepare solid and preact intlayer
doc: fix anchors
chore: update lockfile
```

Maintaining this format helps ensure consistent, readable commit history and is also necessary for automated tools like [changesets](https://github.com/changesets/changesets) to work correctly.

## Release and PR

> Dont works properly. Need to fix it.

This repo uses [changesets](https://github.com/changesets/changesets) to
make releasing updates easier.

Use the command `pnpm changeset` to indicate what packages should have a major/minor/patch bump. A changeset is asked in your PR, and can also be added using github changeset bot.

Once a changeset present, run the command `pnpm changeset:version` to increment the related packages version. Recommended commit name : `chore(release): version packages`.

If new version of packages are referenced, and you're a maintainer, the command `pnpm changeset:publish` is dedicated to the packages release.

Note: the versioning and the publication are automatically managed by the CI/CD.

### Includes a new package

If you're working on a new package, ensure this pacakge is listed in the `packageBuildOrder` array in `scripts/package-build-order.mjs`.
