import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../Components/TaskForm';

test('renders task form', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} title="New Task" />);
  
  expect(screen.getByText('New Task')).toBeInTheDocument();
  expect(screen.getByLabelText('Assigned To')).toBeInTheDocument();
  expect(screen.getByLabelText('Status')).toBeInTheDocument();
  expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
  expect(screen.getByLabelText('Priority')).toBeInTheDocument();
  expect(screen.getByLabelText('Description')).toBeInTheDocument();
});

test('submits form with correct data', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} title="New Task" />);
  
  fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'In Progress' } });
  fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-12-31' } });
  fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test task' } });
  
  fireEvent.click(screen.getByText('Save'));
  
  expect(onSubmit).toHaveBeenCalledWith({
    assignedTo: 'John Doe',
    status: 'In Progress',
    dueDate: '2024-12-31',
    priority: 'High',
    description: 'Test task'
  });
});