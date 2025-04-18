# Contributing to Intlayer

## Understanding the project

To understand the project, you can read the [documentation named "How Intlayer Works"](https://github.com/aymericzip/intlayer/blob/main/docs/en/how_works_intlayer.md).

## Development setup

Intlayer is developed as a mono-repo using pnpm.

### Cloning

```sh
git clone git@github.com:intlayer-org/intlayer.git
```

#### Installing Dependencies

```sh
pnpm install
```

### Preparing the project

```sh
pnpm prepare
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

### Building pacakges

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

### Release and PR

> Dont works properly. Need to fix it.

This repo uses [changesets](https://github.com/changesets/changesets) to
make releasing updates easier.

Use the command `pnpm changeset` to indicate what packages should have a major/minor/patch bump. A changeset is asked in your PR, and can also be added using github changeset bot.

Once a changeset present, run the command `pnpm changeset:version` to increment the related packages version. Recommended commit name : `chore(release): version packages`.

If new version of packages are referenced, and you're a maintainer, the command `pnpm changeset:publish` is dedicated to the packages release.

Note: the versioning and the publication are automatically managed by the CI/CD.
