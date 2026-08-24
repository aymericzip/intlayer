import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Tab } from './Tab';

describe('Tab', () => {
  test('renders markdown-authored tabs that only carry a label', () => {
    const { getAllByRole, getByRole } = render(
      <Tab>
        <Tab.Item label="next-intl">next-intl content</Tab.Item>
        <Tab.Item label="intlayer">intlayer content</Tab.Item>
      </Tab>
    );

    const firstTab = getByRole('tab', { name: 'next-intl' });

    expect(getAllByRole('tab').map((tab) => tab.id)).toEqual([
      'tab-next-intl',
      'tab-intlayer',
    ]);
    expect(firstTab.getAttribute('aria-controls')).toBe('tabpanel-next-intl');
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
  });

  test('falls back to the tab position when neither value nor label is set', () => {
    const { getAllByRole } = render(
      <Tab>
        <Tab.Item>first content</Tab.Item>
        <Tab.Item>second content</Tab.Item>
      </Tab>
    );

    expect(getAllByRole('tab').map((tab) => tab.id)).toEqual([
      'tab-0',
      'tab-1',
    ]);
  });

  test('keeps ids apart when two values sanitize alike', () => {
    const { getAllByRole } = render(
      <Tab>
        <Tab.Item label="Intlayer >=9.4" value=">=9.4">
          recent content
        </Tab.Item>
        <Tab.Item label="Intlayer <9.4" value="<9.4">
          legacy content
        </Tab.Item>
      </Tab>
    );

    const tabs = getAllByRole('tab');

    expect(tabs.map((tab) => tab.id)).toEqual(['tab-94', 'tab-94-2']);
    expect(tabs.map((tab) => tab.getAttribute('aria-controls'))).toEqual([
      'tabpanel-94',
      'tabpanel-94-2',
    ]);
  });

  test('strips whitespace out of ids so aria-controls targets a single panel', () => {
    const { getByRole } = render(
      <Tab>
        <Tab.Item label="Extract command" value="Extract command">
          extract content
        </Tab.Item>
      </Tab>
    );

    expect(getByRole('tab').getAttribute('aria-controls')).toBe(
      'tabpanel-Extract-command'
    );
  });
});
