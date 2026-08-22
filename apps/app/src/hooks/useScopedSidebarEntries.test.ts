import { describe, expect, it } from 'vitest';
import {
  getScopedEntries,
  getSessionScopeId,
  normalizeScopedEntries,
  setScopedEntries,
} from './useScopedSidebarEntries';

const USER_SCOPE = 'user-1/organization-1/project-1';

describe('getSessionScopeId', () => {
  it('combines user, organization and project identifiers', () => {
    expect(
      getSessionScopeId({
        userId: 'user-1',
        organizationId: 'organization-1',
        projectId: 'project-1',
      })
    ).toBe(USER_SCOPE);
  });

  it('falls back to placeholders when no organization or project is active', () => {
    expect(getSessionScopeId({ userId: 'user-1' })).toBe(
      'user-1/no-organization/no-project'
    );
  });

  it('returns null while no user is authenticated', () => {
    expect(getSessionScopeId({ organizationId: 'organization-1' })).toBeNull();
  });

  it('yields a different scope per organization, project and user', () => {
    const base = {
      userId: 'user-1',
      organizationId: 'organization-1',
      projectId: 'project-1',
    };

    const scopeIds = [
      getSessionScopeId(base),
      getSessionScopeId({ ...base, organizationId: 'organization-2' }),
      getSessionScopeId({ ...base, projectId: 'project-2' }),
      getSessionScopeId({ ...base, userId: 'user-2' }),
    ];

    expect(new Set(scopeIds).size).toBe(scopeIds.length);
  });
});

describe('normalizeScopedEntries', () => {
  it('adopts a legacy flat list into the current scope', () => {
    expect(normalizeScopedEntries(['a', 'b'], USER_SCOPE)).toEqual({
      [USER_SCOPE]: ['a', 'b'],
    });
  });

  it('drops an empty legacy list', () => {
    expect(normalizeScopedEntries([], USER_SCOPE)).toEqual({});
  });

  it('keeps an already scoped map untouched', () => {
    const scopedEntries = { [USER_SCOPE]: ['a'], 'other-scope': ['b'] };

    expect(normalizeScopedEntries(scopedEntries, USER_SCOPE)).toBe(
      scopedEntries
    );
  });

  it('handles a missing record', () => {
    expect(normalizeScopedEntries(undefined, USER_SCOPE)).toEqual({});
  });
});

describe('getScopedEntries', () => {
  it('reads only the entries of the given scope', () => {
    expect(
      getScopedEntries(
        { [USER_SCOPE]: ['a'], 'other-scope': ['b'] },
        USER_SCOPE
      )
    ).toEqual(['a']);
  });

  it('returns an empty list for a scope without entries', () => {
    expect(getScopedEntries({ 'other-scope': ['b'] }, USER_SCOPE)).toEqual([]);
  });

  it('returns an empty list while the scope is unresolved', () => {
    expect(getScopedEntries({ [USER_SCOPE]: ['a'] }, null)).toEqual([]);
  });
});

describe('setScopedEntries', () => {
  it('updates the given scope only', () => {
    expect(
      setScopedEntries(
        { [USER_SCOPE]: ['a'], 'other-scope': ['b'] },
        USER_SCOPE,
        (entries) => [...entries, 'c']
      )
    ).toEqual({ [USER_SCOPE]: ['a', 'c'], 'other-scope': ['b'] });
  });

  it('creates the scope when it holds no entry yet', () => {
    expect(
      setScopedEntries({ 'other-scope': ['b'] }, USER_SCOPE, () => ['a'])
    ).toEqual({ [USER_SCOPE]: ['a'], 'other-scope': ['b'] });
  });

  it('preserves legacy entries by migrating them before the update', () => {
    expect(
      setScopedEntries(['a'], USER_SCOPE, (entries) => [...entries, 'b'])
    ).toEqual({ [USER_SCOPE]: ['a', 'b'] });
  });

  it('restores the entries of a scope after switching away and back', () => {
    const firstScope = 'user-1/organization-1/project-1';
    const secondScope = 'user-1/organization-2/project-2';

    const afterFirstPin = setScopedEntries(undefined, firstScope, () => ['a']);
    const afterSecondPin = setScopedEntries(afterFirstPin, secondScope, () => [
      'b',
    ]);

    expect(getScopedEntries(afterSecondPin, secondScope)).toEqual(['b']);
    expect(getScopedEntries(afterSecondPin, firstScope)).toEqual(['a']);
  });
});
