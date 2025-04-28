import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ImportExport from './components/ImportExport';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  
  // Charger les tâches du localStorage au démarrage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Sauvegarder les tâches dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Ajouter une nouvelle tâche
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };
  
  // Supprimer une tâche
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Marquer une tâche comme complétée
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Importer des tâches depuis un fichier
  const importTasks = (importedTasks) => {
    setTasks(importedTasks);
  };
  
  return (
    <div className="app-container">
      <h1>Gestionnaire de Tâches</h1>
      <div className="app-content">
        <div className="main-section">
          <TaskForm onAddTask={addTask} />
          <TaskList 
            tasks={tasks} 
            onDeleteTask={deleteTask} 
            onToggleComplete={toggleComplete}
          />
        </div>
        <div className="sidebar">
          <ImportExport tasks={tasks} onImport={importTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;