import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await TaskService.getTasks();
    setTasks(loadedTasks);
  };

  const addTask = async (task) => {
    const newTask = await TaskService.addTask(task);
    setTasks([...tasks, newTask]);
    setShowNewTaskForm(false);
  };

  const updateTask = async (task) => {
    const updatedTask = await TaskService.updateTask(task);
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setShowEditTaskForm(false);
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    await TaskService.deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowEditTaskForm(true);
  };

  return (
    <ErrorBoundary>
      {
         <div className="slds-container_center slds-container_large">
         <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_medium">
           <h1 className="slds-text-heading_large slds-col">Tasks</h1>
           <div className="slds-col_bump-left">
             <button className="slds-button slds-button_neutral" onClick={() => setShowNewTaskForm(true)}>New Task</button>
             <button className="slds-button slds-button_neutral">Refresh</button>
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
       </div>
      }
    </ErrorBoundary>
   
  );
}

export default App;