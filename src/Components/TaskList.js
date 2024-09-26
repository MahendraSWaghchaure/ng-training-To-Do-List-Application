import React, { useState, useMemo } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import Pagination from './Pagination'; // Import the Pagination component

function TaskList({ tasks, onDelete, onEdit }) {
  // State for deletion confirmation and pagination
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // State for filtering and sorting
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('All');

  // Handling task deletion
  const handleDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete(taskToDelete.id);
    setShowDeleteConfirmation(false);
  };

  // Handle sorting logic
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort tasks based on user input
  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = tasks;
    if (filterStatus !== 'All') {
      filteredTasks = tasks.filter(task => task.status === filterStatus);
    }

    return filteredTasks.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tasks, filterStatus, sortField, sortDirection]);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredAndSortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Filter dropdown */}
      <select
        className="slds-select"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ width: '150px', padding: '4px', fontSize: '12px' }} 
        >
        <option value="All">All</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
    </select>


      {/* Task list table */}
      <div className="slds-table_bordered slds-table_cell-buffer">
        <table className="slds-table slds-table_bordered slds-table_cell-buffer">
          <thead>
            <tr className="slds-line-height_reset">
              <th scope="col"></th>
              <th scope="col" onClick={() => handleSort('assignedTo')}>
                Assigned To {sortField === 'assignedTo' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th scope="col" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th scope="col" onClick={() => handleSort('dueDate')}>
                Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th scope="col" onClick={() => handleSort('priority')}>
                Priority {sortField === 'priority' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th scope="col">Comments</th>
              <th scope="col">Actions</th>
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
