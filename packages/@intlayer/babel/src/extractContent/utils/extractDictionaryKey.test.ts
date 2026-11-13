import { describe, expect, it } from 'vitest';
import {
  extractDictionaryKey,
  extractDictionaryKeyFromPath,
} from './extractDictionaryKey';

describe('extractDictionaryKeyFromPath', () => {
  it.each([
    ['src/components/MyComponent.tsx', 'my-component'],
    ['src/components/MyComponent/index.tsx', 'my-component'],
    ['app/[locale]/(marketing)/about/page.tsx', 'about'],
    ['app/[locale]/dashboard/layout.tsx', 'dashboard'],
    ['src/routes/{-$locale}/about/route.tsx', 'about'],
    ['src/routes/blog/[slug]/+page.svelte', 'blog'],
    ['app/routes/_index.tsx', 'routes'],
    ['src/components/user_card.vue', 'user-card'],
  ])('%s -> %s', (filePath, expectedKey) => {
    expect(extractDictionaryKeyFromPath(filePath)).toBe(expectedKey);
  });

  it('applies the prefix', () => {
    expect(extractDictionaryKeyFromPath('src/Header.tsx', 'comp-')).toBe(
      'comp-header'
    );
  });
});

describe('extractDictionaryKey', () => {
  it.each([
    [
      'src/components/Card.tsx',
      'export default memo(function ProductCard() {})',
      'product-card',
    ],
    [
      'app/[locale]/about/page.tsx',
      'export default async function Page() { return <h1>About</h1>; }',
      'about',
    ],
    [
      'src/routes/{-$locale}/counter.tsx',
      "export const Route = createFileRoute('/counter')({ component: Counter });",
      'counter',
    ],
    [
      'src/components/Hero.tsx',
      'export default () => <h1>Welcome</h1>;',
      'hero',
    ],
  ])('%s -> %s', (filePath, fileText, expectedKey) => {
    expect(extractDictionaryKey(filePath, fileText)).toBe(expectedKey);
  });
});
