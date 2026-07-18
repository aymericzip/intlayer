import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parseMailFrom, resolveGlobalMailer } from './email.service';

/** Env keys the global mailer reads, snapshotted and restored per test. */
const MAILER_ENV_KEYS = [
  'MAIL_PROVIDER',
  'MAIL_FROM',
  'MAIL_SMTP_HOST',
  'MAIL_SMTP_PORT',
  'MAIL_SMTP_SECURE',
  'MAIL_SMTP_USER',
  'MAIL_SMTP_PASSWORD',
  'RESEND_API_KEY',
] as const;

const originalEnv: Record<string, string | undefined> = {};

beforeEach(() => {
  for (const key of MAILER_ENV_KEYS) {
    originalEnv[key] = process.env[key];
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of MAILER_ENV_KEYS) {
    if (originalEnv[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalEnv[key];
    }
  }
});

describe('parseMailFrom', () => {
  it('returns empty parts for an undefined or blank value', () => {
    expect(parseMailFrom(undefined)).toEqual({});
    expect(parseMailFrom('   ')).toEqual({});
  });

  it('treats a bare address as the email', () => {
    expect(parseMailFrom('no-reply@acme.com')).toEqual({
      fromEmail: 'no-reply@acme.com',
    });
  });

  it('splits a formatted "Name <email>" header', () => {
    expect(parseMailFrom('Acme Team <no-reply@acme.com>')).toEqual({
      fromName: 'Acme Team',
      fromEmail: 'no-reply@acme.com',
    });
  });

  it('omits the name when the header has none', () => {
    expect(parseMailFrom('<no-reply@acme.com>')).toEqual({
      fromEmail: 'no-reply@acme.com',
    });
  });
});

describe('resolveGlobalMailer', () => {
  it('returns null when MAIL_PROVIDER is unset', () => {
    expect(resolveGlobalMailer()).toBeNull();
  });

  it('returns null for an unrecognized MAIL_PROVIDER', () => {
    process.env.MAIL_PROVIDER = 'sendgrid';

    expect(resolveGlobalMailer()).toBeNull();
  });

  it('builds an active SMTP config from env vars', () => {
    process.env.MAIL_PROVIDER = 'smtp';
    process.env.MAIL_FROM = 'Acme <no-reply@acme.com>';
    process.env.MAIL_SMTP_HOST = 'smtp-relay';
    process.env.MAIL_SMTP_PORT = '2525';
    process.env.MAIL_SMTP_SECURE = 'true';
    process.env.MAIL_SMTP_USER = 'relay-user';
    process.env.MAIL_SMTP_PASSWORD = 'relay-pass';

    expect(resolveGlobalMailer()).toEqual({
      isActive: true,
      provider: 'smtp',
      fromName: 'Acme',
      fromEmail: 'no-reply@acme.com',
      smtp: {
        host: 'smtp-relay',
        port: 2525,
        secure: true,
        user: 'relay-user',
        password: 'relay-pass',
      },
    });
  });

  it('defaults SMTP secure to false and leaves an unset port undefined', () => {
    process.env.MAIL_PROVIDER = 'smtp';
    process.env.MAIL_SMTP_HOST = 'smtp-relay';

    const config = resolveGlobalMailer();

    expect(config?.smtp?.secure).toBe(false);
    expect(config?.smtp?.port).toBeUndefined();
  });

  it('is case-insensitive and trims MAIL_PROVIDER', () => {
    process.env.MAIL_PROVIDER = '  SMTP ';
    process.env.MAIL_SMTP_HOST = 'smtp-relay';

    expect(resolveGlobalMailer()?.provider).toBe('smtp');
  });

  it('builds an active Resend config from env vars', () => {
    process.env.MAIL_PROVIDER = 'resend';
    process.env.MAIL_FROM = 'no-reply@acme.com';
    process.env.RESEND_API_KEY = 're_live_key';

    expect(resolveGlobalMailer()).toEqual({
      isActive: true,
      provider: 'resend',
      fromName: undefined,
      fromEmail: 'no-reply@acme.com',
      resend: { apiKey: 're_live_key' },
    });
  });
});
