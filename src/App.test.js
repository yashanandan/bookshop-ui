import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  console.log('getbyText', getByText);
  const linkElement = getByText(/Book Store/i);
  expect(linkElement).toBeInTheDocument();
});
