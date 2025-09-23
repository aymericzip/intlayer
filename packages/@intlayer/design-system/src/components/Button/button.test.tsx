import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  test.skip('renders', () => {
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
});
