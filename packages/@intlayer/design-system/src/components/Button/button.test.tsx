import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  test('renders', () => {
    const buttonContent = "I'm a button";
    const buttonLabel = 'test label';

    render(
      <Button label={buttonLabel} data-testid="button">
        {buttonContent}
      </Button>
    );

    const buttonByTestID = screen.getByTestId('button');
    const buttonByText = screen.getByText(buttonContent);

    expect(buttonByTestID).toBeDefined();
    expect(buttonByText).toBeDefined();

    const labelResult = buttonByTestID.getAttribute('aria-label');

    expect(labelResult).toBe(buttonLabel);
  });

  test('keeps centered text between equal side slots while loading', () => {
    const buttonContent = 'Save';

    render(
      <Button label="save" isLoading>
        {buttonContent}
      </Button>
    );

    const textElement = screen.getByText(buttonContent);
    const rowElement = textElement.parentElement;
    const loaderElement = screen.getByTestId('loader');

    expect(rowElement?.children).toHaveLength(3);
    expect(rowElement?.firstElementChild?.className).toContain(
      'flex-1 basis-0'
    );
    expect(rowElement?.lastElementChild?.className).toContain('flex-1 basis-0');
    expect(rowElement?.firstElementChild?.contains(loaderElement)).toBe(true);
  });
});
