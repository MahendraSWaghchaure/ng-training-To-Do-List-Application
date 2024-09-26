const TaskService = {
    getTasks: async () => {
      return JSON.parse(localStorage.getItem('tasks') || '[]');
    },
  
    addTask: async (task) => {
      const tasks = await TaskService.getTasks();
      const newTask = { 
        ...task, 
        id: Date.now(),
        comments: task.description // Using description as comments for simplicity
      };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return newTask;
    },
  
    updateTask: async (updatedTask) => {
      const tasks = await TaskService.getTasks();
      const index = tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = {
          ...updatedTask,
          comments: updatedTask.description // Update comments when description changes
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
      return updatedTask;
    },
  
    deleteTask: async (id) => {
      const tasks = await TaskService.getTasks();
      const updatedTasks = tasks.filter(t => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };
  
  export default TaskService;