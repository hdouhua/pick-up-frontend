import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './components/demo/Hello';

test('renders learn react link', () => {
  render(<Hello name='Typescript' />);
  const element = screen.getByText(/hello typescript/i);
  expect(element).toBeInTheDocument();
});
