import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import TaskService from './Services/TaskServices';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Memoize loadTasks using useCallback
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const loadedTasks = await TaskService.getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      showNotification('Failed to load tasks.', 'error');
    }
    setLoading(false);
  }, []); // Dependencies array can be empty if it doesn't depend on any external variables

  useEffect(() => {
    loadTasks();
    
    // Keyboard shortcuts
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'n') { // Ctrl + N for new task
        setShowNewTaskForm(true);
      }
      if (event.ctrlKey && event.key === 'r') { // Ctrl + R for refresh
        loadTasks();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loadTasks]); // Include loadTasks in the dependency array

  const addTask = async (task) => {
    try {
      const newTask = await TaskService.addTask(task);
      setTasks([...tasks, newTask]);
      setShowNewTaskForm(false);
      showNotification('Task added successfully!', 'success');
    } catch (error) {
      showNotification('Failed to add task.', 'error');
    }
  };

  const updateTask = async (task) => {
    try {
      const updatedTask = await TaskService.updateTask(task);
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      setShowEditTaskForm(false);
      setEditingTask(null);
      showNotification('Task updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update task.', 'error');
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      showNotification('Task deleted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to delete task.', 'error');
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowEditTaskForm(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 30000); // Notification disappears after 3 seconds
  };

  return (
    <ErrorBoundary>
      <div className="slds-container_center slds-container_large">
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        {loading ? (
          <div className="loading-indicator">Loading tasks...</div>
        ) : (
          <>
            <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_medium">
              <h1 className="slds-text-heading_large slds-col">Tasks</h1>
              <div className="slds-col_bump-left">
                <button className="slds-button slds-button_neutral" onClick={() => setShowNewTaskForm(true)}>New Task</button>
                <button className="slds-button slds-button_neutral" onClick={loadTasks}>Refresh</button>
              </div>
            </div>
            <TaskList 
              tasks={tasks} 
              onDelete={deleteTask} 
              onEdit={editTask} 
            />
            {showNewTaskForm && (
              <TaskForm 
                onSubmit={addTask} 
                onCancel={() => setShowNewTaskForm(false)}
                title="New Task"
              />
            )}
            {showEditTaskForm && (
              <TaskForm 
                onSubmit={updateTask} 
                onCancel={() => setShowEditTaskForm(false)}
                task={editingTask}
                title="Edit Task"
              />
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
