# Contributing to IntLayer

## Understanding the project

To understand the project, you can read the [documentation named "How Intlayer Works"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/how_works_intlayer.md).

## Development setup

IntLayer is developed as a mono-repo using pmpm.

### Cloning

```sh
git clone git@github.com:intlayer-org/intlayer.git
```

#### Installing Dependencies

```sh
pnpm add
```

### Preparing the project

```sh
pnpm prepare
```

### Building the source

```sh
# One-time build for packages
pmpm build-packages

# One-time build for example applications
pmpm build-examples

# One-time build for website
pnpm build-website

# One-time build for backend
pnpm build-backend
```

### Setup environment variables

For each project necessitating environment variables, you can fond a `.env.template` file in the root of the project. Copy the file and rename it to `.env`. Then, fill the variables with the correct values.

### Development mode

```sh
# start development mode for selected packages or apps
# This command allow to pick the packages to execute in watch-mode, avoid conflicts, and optimize performances during development

pnpm dev
```

### Resolve build error

If the build block using the commands `pnpm dev` or `pnpm build`, you can use the command `pnpm clean`, `pnpm clean-packages` or `pnpm clean-examples` to remove the build/dist folders of the packages.

The commands `reset`, `reset-packages`, or `reset-examples` also clear the related build/dist folders to build it again.

### Run tests

```sh
pmpm test
```

### Release and PR

This repo uses [changesets](https://github.com/changesets/changesets) to
make releasing updates easier.

Use the command `pnpm changeset` to indicate what packages should have a major/minor/patch bump. A changeset is asked in your PR, and can also be added using github changeset bot.

Once a changeset present, run the command `pnpm changeset:version` to increment the related packages version. Recommended commit name : `chore(release): version packages`.

If new version of packages are referenced, and you're a maintainer, the command `pnpm changeset:publish` is dedicated to the packages release.

Note: the versioning and the publication are automatically managed by the CI/CD.
