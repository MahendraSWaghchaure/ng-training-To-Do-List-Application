import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../Components/TaskList';

const mockTasks = [
  { id: 1, assignedTo: 'User 1', status: 'Not Started', dueDate: '2024-12-31', priority: 'High', comments: 'Test task 1' },
  { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-11-30', priority: 'Medium', comments: 'Test task 2' },
];

test('renders task list with pagination', () => {
  render(<TaskList tasks={mockTasks} onDelete={() => {}} onEdit={() => {}} />);
  expect(screen.getByText('User 1')).toBeInTheDocument();
  expect(screen.getByText('User 2')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument(); // Pagination button
});

test('filters tasks', () => {
  render(<TaskList tasks={mockTasks} onDelete={() => {}} onEdit={() => {}} />);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'In Progress' } });
  expect(screen.getByText('User 2')).toBeInTheDocument();
  expect(screen.queryByText('User 1')).not.toBeInTheDocument();
});

test('sorts tasks', () => {
  render(<TaskList tasks={mockTasks} onDelete={() => {}} onEdit={() => {}} />);
  fireEvent.click(screen.getByText('Assigned To'));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('User 1');
  fireEvent.click(screen.getByText('Assigned To'));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('User 2');
});