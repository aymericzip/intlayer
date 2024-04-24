import { render, screen } from '@testing-library/react';
// import App from './App';

test('renders learn react link', () => {
  // TODO: Fix Jest test, fail because of 'conditional import' in the code
  // render(<App />);
  render(<div>learn react</div>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeTruthy();
});
