import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// 10 MB — bundled CJS can be larger than the source
const MAX_CODE_BYTES = 10 * 1024 * 1024;

// These Node.js built-ins are compiled into the binary and are NOT gated by
// --experimental-permission's FS flag, so we block them explicitly via a
// require wrapper injected before the user code runs.
const NETWORK_AND_PROCESS_BUILTINS = [
  'net',
  'http',
  'https',
  'http2',
  'tls',
  'dgram',
  'dns',
  'dns/promises',
  'child_process',
  'cluster',
  'worker_threads',
];

// Preamble injected at the top of every sandboxed script:
//   1. Silence console so config-file log calls don't corrupt the JSON output.
//   2. Patch require() to block network and process-spawning built-ins.
const SANDBOX_PREAMBLE = `
"use strict";
// 1. Silence console to prevent log pollution on stdout.
(function silenceConsole() {
  var noop = function() {};
  ['log','info','warn','error','debug','trace','dir','table'].forEach(function(k) {
    console[k] = noop;
  });
})();

// 2. Block dangerous built-in modules that --experimental-permission does not cover.
(function patchRequire() {
  var _orig = require;
  var _blocked = new Set(${JSON.stringify(NETWORK_AND_PROCESS_BUILTINS)});
  var _safeRequire = function safeRequire(id) {
    var normalized = typeof id === 'string' ? id.replace(/^node:/, '') : id;
    if (_blocked.has(normalized)) {
      throw new Error('Module access denied: ' + id);
    }
    return _orig(id);
  };
  // Mirror NodeJS.Require properties so bundled code that inspects require still works.
  Object.keys(_orig).forEach(function(k) { try { _safeRequire[k] = _orig[k]; } catch(_) {} });
  global.require = _safeRequire;
})();
`;

/**
 * Execute a self-contained CJS string in an isolated child process and return
 * the parsed default export as T.
 *
 * The caller MUST bundle all npm dependencies inline before passing cjsCode;
 * the child process has no access to node_modules (FS reads are restricted
 * to the temp file only).
 *
 * Security layers:
 *  - env: {}          — child starts with no environment variables, so the
 *                       server's secrets (DB URLs, API keys, …) are invisible.
 *  - --experimental-permission + --allow-fs-read=<tempFile>
 *                     — OS-level: blocks all other FS reads, all FS writes,
 *                       child_process, and worker_threads.
 *  - SANDBOX_PREAMBLE — JS-level: additionally blocks net/http/https/tls/dgram
 *                       (built-ins the permission model doesn't cover) and
 *                       silences console to prevent stdout corruption.
 *  - timeout: 5 s     — hard-kills runaway or infinite-loop code.
 *  - maxBuffer: 1 MB  — caps stdout to prevent memory exhaustion.
 */
export const safeParseJS = async <T>(cjsCode: string): Promise<T> => {
  if (Buffer.byteLength(cjsCode) > MAX_CODE_BYTES) {
    throw new Error('Bundled code exceeds size limit');
  }

  // Cryptographically random filename — prevents timing attacks that try to
  // pre-create a symlink at a predictable path.
  const id = randomBytes(16).toString('hex');
  const tempFilePath = join(tmpdir(), `intlayer-config-${id}.cjs`);

  const script = `${SANDBOX_PREAMBLE}
${cjsCode}
process.stdout.write(JSON.stringify(module.exports?.default ?? module.exports));
`;

  writeFileSync(tempFilePath, script, 'utf-8');

  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        '--experimental-permission',
        `--allow-fs-read=${tempFilePath}`,
        tempFilePath,
      ],
      {
        timeout: 5000,
        maxBuffer: 1 * 1024 * 1024,
        // Empty env: the child process cannot read any server environment
        // variable, eliminating the most common secret-exfiltration vector.
        env: {},
      }
    );

    return JSON.parse(stdout) as T;
  } catch {
    throw new Error('Foreign code execution failed or timed out.');
  } finally {
    try {
      unlinkSync(tempFilePath);
    } catch {
      // Ignore cleanup errors
    }
  }
};
