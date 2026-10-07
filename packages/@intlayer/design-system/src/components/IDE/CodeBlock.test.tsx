import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeBlock } from './CodeBlockClient';

describe('CodeBlock', () => {
  it('renders standard code block by default without inverse classes', () => {
    render(
      <CodeBlock lang="bash" data-testid="code-block">
        npx intlayer config push
      </CodeBlock>
    );

    const el = screen.getByTestId('code-block');
    expect(el).toBeDefined();
    expect(el.classList.contains('shiki-inverse')).toBe(false);
    expect(el.getAttribute('data-inverse')).toBeNull();
  });

  it('renders with inverse classes and attributes when isInverse is true', () => {
    render(
      <CodeBlock lang="bash" isInverse data-testid="code-block-inverse">
        npx intlayer config push
      </CodeBlock>
    );

    const el = screen.getByTestId('code-block-inverse');
    expect(el.classList.contains('shiki-inverse')).toBe(true);
    expect(el.classList.contains('text-text-opposite')).toBe(true);
    expect(el.getAttribute('data-inverse')).toBe('true');
  });

  it('renders with explicit isDarkMode values', () => {
    const { rerender } = render(
      <CodeBlock lang="bash" isDarkMode={true} data-testid="code-block-dark">
        npx intlayer config push
      </CodeBlock>
    );

    let el = screen.getByTestId('code-block-dark');
    expect(el.classList.contains('shiki-dark')).toBe(true);
    expect(el.getAttribute('data-shiki-theme')).toBe('dark');

    rerender(
      <CodeBlock lang="bash" isDarkMode={false} data-testid="code-block-dark">
        npx intlayer config push
      </CodeBlock>
    );

    el = screen.getByTestId('code-block-dark');
    expect(el.classList.contains('shiki-light')).toBe(true);
    expect(el.getAttribute('data-shiki-theme')).toBe('light');
  });
});
