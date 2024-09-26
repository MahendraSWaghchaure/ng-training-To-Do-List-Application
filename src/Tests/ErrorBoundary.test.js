import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../Components/ErrorBoundary';

test('renders children when there is no error', () => {
  render(
    <ErrorBoundary>
      <div>Test content</div>
    </ErrorBoundary>
  );
  expect(screen.getByText('Test content')).toBeInTheDocument();
});

test('renders error message when there is an error', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
  expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
});