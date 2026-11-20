import { describe, expect, it, vi } from 'vitest';

vi.mock('@schemas/project.schema', () => ({ ProjectModel: {} }));
vi.mock('@services/email.service', () => ({ sendEmail: vi.fn() }));
vi.mock('@services/user.service', () => ({ getUserById: vi.fn() }));

const {
  ACCESS_KEY_EXPIRED_NOTICE_GRACE_MS,
  ACCESS_KEY_REMINDER_WINDOW_MS,
  getDueExpirationNotification,
} = await import('./accessKeyNotification.service');

const now = new Date('2026-11-20T12:00:00.000Z');
const hourMs = 60 * 60 * 1000;
const dayMs = 24 * hourMs;

/** Date offset from `now` by the given milliseconds. */
const fromNow = (offsetMs: number): Date => new Date(now.getTime() + offsetMs);

describe('getDueExpirationNotification', () => {
  it('ignores keys without an expiration date', () => {
    expect(getDueExpirationNotification({}, now)).toBeNull();
  });

  it('ignores keys expiring after the reminder window', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(ACCESS_KEY_REMINDER_WINDOW_MS + hourMs) },
        now
      )
    ).toBeNull();
  });

  it('reminds keys expiring within 3 days', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(2 * dayMs), createdAt: fromNow(-30 * dayMs) },
        now
      )
    ).toBe('expiringSoon');
  });

  it('reminds only once', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(2 * dayMs), expirationReminderSentAt: now },
        now
      )
    ).toBeNull();
  });

  it('skips the reminder for keys created with a short lifetime', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(2 * dayMs), createdAt: fromNow(-hourMs) },
        now
      )
    ).toBeNull();
  });

  it('notifies expired keys once', () => {
    const expiresAt = fromNow(-hourMs);

    expect(getDueExpirationNotification({ expiresAt }, now)).toBe('expired');
    expect(
      getDueExpirationNotification(
        { expiresAt, expirationNoticeSentAt: now },
        now
      )
    ).toBeNull();
  });

  it('notifies an expired key even when its reminder was sent', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(-hourMs), expirationReminderSentAt: now },
        now
      )
    ).toBe('expired');
  });

  it('ignores keys expired before the grace period', () => {
    expect(
      getDueExpirationNotification(
        { expiresAt: fromNow(-ACCESS_KEY_EXPIRED_NOTICE_GRACE_MS - hourMs) },
        now
      )
    ).toBeNull();
  });
});
