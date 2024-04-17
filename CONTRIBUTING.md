# Contributing to IntLayer

## Development setup

IntLayer is developed as a mono-repo using pmpm.

### Cloning

```sh
git clone git@github.com:aypineau/intlayer.git
```

#### Installing Dependencies

```sh
pnpm install
```

### Building the source

```sh
# One-time build
pmpm build-packages

# Build and watch files for changes
pmpm dev-packages
```

### Run tests

```sh
pmpm test
```

### Release and PR

This repo uses [changesets](https://github.com/changesets/changesets) to
make releasing updates easier.
