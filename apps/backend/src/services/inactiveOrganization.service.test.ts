import { describe, expect, it, vi } from 'vitest';

vi.mock('@schemas/oAuth2.schema', () => ({ OAuth2AccessTokenModel: {} }));
vi.mock('@schemas/organization.schema', () => ({ OrganizationModel: {} }));
vi.mock('@schemas/project.schema', () => ({ ProjectModel: {} }));
vi.mock('@schemas/session.schema', () => ({ SessionModel: {} }));
vi.mock('@schemas/user.schema', () => ({ UserModel: {} }));
vi.mock('@services/email.service', () => ({ sendEmail: vi.fn() }));
vi.mock('@services/organizationDeletion.service', () => ({
  deleteOrganizationAndData: vi.fn(),
}));

const {
  ORGANIZATION_DELETION_NOTICE_MS,
  ORGANIZATION_INACTIVITY_THRESHOLD_MS,
  getInactiveOrganizationAction,
} = await import('./inactiveOrganization.service');

const now = new Date('2026-11-20T12:00:00.000Z');
const dayMs = 24 * 60 * 60 * 1000;

/** Date offset from `now` by the given milliseconds. */
const fromNow = (offsetMs: number): Date => new Date(now.getTime() + offsetMs);

const inactiveSince = fromNow(-ORGANIZATION_INACTIVITY_THRESHOLD_MS - dayMs);

describe('getInactiveOrganizationAction', () => {
  it('leaves recently active organizations alone', () => {
    expect(
      getInactiveOrganizationAction({ lastActivityAt: fromNow(-dayMs) }, now)
    ).toBeNull();
  });

  it('warns organizations inactive for 6 months', () => {
    expect(
      getInactiveOrganizationAction({ lastActivityAt: inactiveSince }, now)
    ).toBe('warn');
  });

  it('waits for the scheduled deletion date after warning', () => {
    expect(
      getInactiveOrganizationAction(
        {
          lastActivityAt: inactiveSince,
          inactivityWarningSentAt: fromNow(-dayMs),
          inactivityDeletionScheduledAt: fromNow(
            ORGANIZATION_DELETION_NOTICE_MS - dayMs
          ),
        },
        now
      )
    ).toBeNull();
  });

  it('deletes once the scheduled date is reached', () => {
    expect(
      getInactiveOrganizationAction(
        {
          lastActivityAt: inactiveSince,
          inactivityWarningSentAt: fromNow(-ORGANIZATION_DELETION_NOTICE_MS),
          inactivityDeletionScheduledAt: now,
        },
        now
      )
    ).toBe('delete');
  });

  it('cancels the deletion when someone signed in after the warning', () => {
    expect(
      getInactiveOrganizationAction(
        {
          lastActivityAt: fromNow(-dayMs),
          inactivityWarningSentAt: fromNow(-2 * dayMs),
          inactivityDeletionScheduledAt: fromNow(-dayMs),
        },
        now
      )
    ).toBe('cancel');
  });
});
