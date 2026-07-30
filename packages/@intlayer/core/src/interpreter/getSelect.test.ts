import { describe, expect, it } from 'vitest';
import { getSelect } from './getSelect';

describe('getSelect', () => {
  it('should pick the content matching the provided case', () => {
    const content = getSelect(
      {
        draft: 'This post is a draft',
        published: 'This post is live',
        scheduled: 'This post is scheduled',
      },
      'published'
    );

    expect(content).toBe('This post is live');
  });

  it('should pick the fallback when no case matches', () => {
    const content = getSelect(
      {
        draft: 'This post is a draft',
        fallback: 'Unknown status',
      },
      'archived'
    );

    expect(content).toBe('Unknown status');
  });

  it('should pick the fallback when no value is provided', () => {
    const content = getSelect(
      {
        draft: 'This post is a draft',
        fallback: 'Unknown status',
      },
      undefined
    );

    expect(content).toBe('Unknown status');
  });

  it('should pick the `other` case for content imported from ICU', () => {
    const content = getSelect(
      {
        draft: 'This post is a draft',
        other: 'Unknown status',
      },
      'archived'
    );

    expect(content).toBe('Unknown status');
  });

  it('should pick the last declared case when no fallback is declared', () => {
    const content = getSelect(
      {
        draft: 'This post is a draft',
        published: 'This post is live',
      },
      'archived'
    );

    expect(content).toBe('This post is live');
  });

  it('should not confuse a case named after a falsy value with a missing case', () => {
    const content = getSelect(
      {
        none: '',
        fallback: 'Unknown status',
      },
      'none'
    );

    expect(content).toBe('');
  });
});
