import { describe, expect, it } from 'vitest';
import { getNodeText } from './getNodeText';

describe('getNodeText', () => {
  it('extracts the plain text of a link title node', () => {
    expect(getNodeText('Intlayer VS Code Extension')).toBe(
      'Intlayer VS Code Extension'
    );
    expect(getNodeText(['Intlayer VS Code Extension'])).toBe(
      'Intlayer VS Code Extension'
    );
    expect(
      getNodeText([
        'Intlayer ',
        <strong key="bold">VS Code</strong>,
        ' Extension',
      ])
    ).toBe('Intlayer VS Code Extension');
    expect(getNodeText(null)).toBe('');
  });
});
