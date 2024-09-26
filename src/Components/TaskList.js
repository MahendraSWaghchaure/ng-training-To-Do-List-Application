import React, { useState, useMemo } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import Pagination from './Pagination';
import '../Styling/TaskList.css'; 

function TaskList({ tasks, onDelete, onEdit }) {
  // State to manage the visibility of the delete confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  // States for sorting, filtering, and search
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Function to handle task deletion
  const handleDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirmation(true);
  };

   // Confirm the deletion of the task
  const confirmDelete = () => {
    onDelete(taskToDelete.id);
    setShowDeleteConfirmation(false);
  };

  // Function to handle sorting of tasks
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort tasks based on user input and search query
  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = tasks;

    // Filter by status
    if (filterStatus !== 'All') {
      filteredTasks = tasks.filter(task => task.status === filterStatus);
    }

    // Filter by search query (e.g., search task name, comments, etc.)
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task =>
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.comments.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort the tasks
    return filteredTasks.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tasks, filterStatus, sortField, sortDirection, searchQuery]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredAndSortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="task-list-container">
      {/* Search and Filter bar */}
      <div className="task-list-controls">
        {/* Filter dropdown */}
        <div className="task-list-filter">
          <select
            className="slds-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Search bar */}
        <div className="task-list-search">
          <input
            type="text"
            placeholder="Search tasks..."
            className="slds-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task list table */}
      <div className="task-table-container">
        <table className="task-list-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort('assignedTo')}>
                Assigned To {sortField === 'assignedTo' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('dueDate')}>
                Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('priority')}>
                Priority {sortField === 'priority' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map(task => (
              <tr key={task.id}>
                <td><input type="checkbox" /></td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
                <td>
                  <button
                    className="slds-button slds-button_neutral"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="slds-button slds-button_destructive"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={filteredAndSortedTasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Delete confirmation modal */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          taskName={taskToDelete.title}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}

export default TaskList;
