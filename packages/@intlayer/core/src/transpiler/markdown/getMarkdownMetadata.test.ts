import { describe, expect, it } from 'vitest';
import { getMarkdownMetadata } from '../markdown';

describe('getMarkdownMetadata', () => {
  const markdown = [
    '---',
    'title: Mock Title',
    'description: Mock Description',
    'author: Mock Author',
    'date: 2024-01-01',
    'tags:',
    '  - tag1',
    '  - tag2',
    '  - tag3',
    '---',
    '# Mock Heading',
    'This is a mock paragraph with some sample text.',
    'Here is another mock paragraph.',
    '## Mock Section',
    'Some more mock content goes here.',
    '### Mock Subsection',
    'Final mock paragraph with test content.',
  ].join('\n');

  it('should return the metadata from the markdown file', () => {
    const metadata = getMarkdownMetadata(markdown);
    expect(metadata).toEqual({
      title: 'Mock Title',
      description: 'Mock Description',
      author: 'Mock Author',
      date: '2024-01-01',
      tags: ['tag1', 'tag2', 'tag3'],
    });
  });

  it('should return an empty object if the markdown file is empty', () => {
    const metadata = getMarkdownMetadata('');
    expect(metadata).toEqual({});
  });

  it('should parse complex YAML metadata with history field', () => {
    const markdownWithHistory = [
      '---',
      'title: Configuration',
      'description: Learn how to configure Intlayer',
      'keywords:',
      '  - Configuration',
      '  - Settings',
      'history:',
      '  - version: 7.0.0',
      '    date: 2025-10-25',
      '    changes: Add dictionary configuration',
      '  - version: 7.0.0',
      '    date: 2025-10-21',
      '    changes: Replace middleware by routing configuration',
      '---',
      '# Configuration',
      'This is the content.',
    ].join('\n');

    const metadata = getMarkdownMetadata(markdownWithHistory);
    expect(metadata).toEqual({
      title: 'Configuration',
      description: 'Learn how to configure Intlayer',
      keywords: ['Configuration', 'Settings'],
      history: [
        {
          version: '7.0.0',
          date: '2025-10-25',
          changes: 'Add dictionary configuration',
        },
        {
          version: '7.0.0',
          date: '2025-10-21',
          changes: 'Replace middleware by routing configuration',
        },
      ],
    });
  });

  it('should parse mixed YAML structures in metadata', () => {
    const markdownWithMixed = [
      '---',
      'title: Test Document',
      'tags:',
      '  - tag1',
      '  - tag2',
      'config:',
      '  enabled: true',
      '  count: 42',
      'authors:',
      '  - name: John Doe',
      '    email: john@example.com',
      '  - name: Jane Smith',
      '    email: jane@example.com',
      '---',
      '# Test',
      'Content here.',
    ].join('\n');

    const metadata = getMarkdownMetadata(markdownWithMixed);
    expect(metadata).toEqual({
      title: 'Test Document',
      tags: ['tag1', 'tag2'],
      config: '',
      count: 42,
      enabled: 'true',
      authors: [
        {
          name: 'John Doe',
          email: 'john@example.com',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
        },
      ],
    });
  });

  it('should handle metadata without closing delimiter', () => {
    const markdownWithoutClosing = [
      '---',
      'title: Test',
      'description: No closing delimiter',
      '# Content',
      'This should not be parsed as metadata.',
    ].join('\n');

    const metadata = getMarkdownMetadata(markdownWithoutClosing);
    expect(metadata).toEqual({});
  });

  it('should handle metadata with no content between delimiters', () => {
    const markdownEmpty = [
      '---',
      '---',
      '# Content',
      'This is the actual content.',
    ].join('\n');

    const metadata = getMarkdownMetadata(markdownEmpty);
    expect(metadata).toEqual({});
  });
});
