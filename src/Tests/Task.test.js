import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../Components/Task';

test('renders task', () => {
  const task = { id: 1, title: 'Test Task' };
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  render(<Task task={task} onDelete={onDelete} onEdit={onEdit} />);

  expect(screen.getByText('Test Task')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Edit'));
  expect(onEdit).toHaveBeenCalledWith(task);

  fireEvent.click(screen.getByText('Delete'));
  expect(onDelete).toHaveBeenCalledWith(task.id);
});