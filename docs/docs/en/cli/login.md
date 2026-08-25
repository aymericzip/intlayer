---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Login
description: Learn how to use the Intlayer CLI login command to authenticate with the Intlayer CMS and obtain access credentials.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Intlayer CLI Login Command

---

## Description

The `login` command of the Intlayer CLI allows you to authenticate with the Intlayer CMS. This command automatically opens your default browser to complete the authentication process and receive the necessary credentials (Client ID and Client Secret) to use Intlayer services.

## Usage

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

or

```bash
intlayer login [options]
```

## Options

### `--cms-url <url>`

Specify the URL of the Intlayer CMS to connect to for authentication.

- **Type**: `string`
- **Default**: The value configured in `intlayer.config.*` or `https://intlayer.org`
- **Example**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Configuration Options

You can also use common configuration options:

- `--env-file <path>`: Path to the environment file
- `-e, --env <env>`: Execution environment
- `--base-dir <dir>`: Base directory of the project
- `--verbose`: Enable detailed output (default: true)
- `--prefix <prefix>`: Prefix for logs

## How It Works

1. **Local Server Start**: The command starts a local HTTP server on a random port to receive credentials from the CMS
2. **Browser Opening**: The command automatically opens your default browser to the CMS login URL
3. **Authentication**: Complete authentication in the browser using your Intlayer account
4. **Credentials Reception**: The local server receives the Client ID and Client Secret from the CMS
5. **Instructions**: The command displays instructions for configuring credentials in your project

## Output

After a successful login, the command will display:

1. **The received credentials** (Client ID and Client Secret)
2. **Instructions for the `.env` file**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instructions for the Intlayer configuration file**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Keeping the access key safe

`intlayer login` issues an **access key**: a `clientId` / `clientSecret` pair that every credentialed command (`push`, `pull`, `fill`, `configuration push`, `live`, …) uses to authenticate.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` is a server-side credential.** It grants full project-scoped API access — reading and writing your dictionaries, your project and your organization. Keep it in `.env` (git-ignored) or your CI secret store, and never inline it in the configuration file.

Intlayer enforces this rather than only documenting it:

- `clientSecret` is **stripped from the configuration your bundler inlines**, so it cannot reach a browser bundle whatever framework integration you use. It is only ever read server-side, at runtime, from the environment.
- `clientId` is different: it is the **public** project key, safe to ship, and used by [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/analytics.md#how-events-are-authenticated) to obtain a short-lived, ingest-only token.

Commenting `clientId` out is enough to disable every credentialed behaviour — remote dictionary fetching, CMS access, analytics — even when the environment variables are still defined.

For CI pipelines, prefer the [`ci` command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/ci.md), which injects the credentials for the duration of a single run instead of persisting them.

## Manual Configuration

If the browser doesn't open automatically, you can manually visit the URL displayed in the terminal.

## Examples

### Login with Custom CMS URL

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Login with Specific Environment File

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Login in Verbose Mode

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Troubleshooting

### Browser Doesn't Open

If the browser doesn't open automatically, copy the URL displayed in the terminal and open it manually in your browser.

### Connection Issues

If you encounter connection issues, verify:

1. That the CMS URL is correct
2. That your internet connection is working properly
3. That there are no firewalls blocking the connection

### Credentials Not Received

If credentials are not received:

1. Make sure you completed the authentication process in the browser
2. Verify that the local port is not blocked
3. Try the command again

## Next Steps

After completing the login:

1. Add the credentials to your `.env` file
2. Configure your `intlayer.config.*` file with the credentials
3. Use CLI commands to manage your dictionaries:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/push.md) - Push dictionaries to the CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/pull.md) - Pull dictionaries from the CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) - Fill missing translations

## See Also

- [CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [Intlayer Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
