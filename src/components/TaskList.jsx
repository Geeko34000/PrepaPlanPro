import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onToggleComplete }) {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('priority'); // 'priority', 'date'
  
  // Filtrer les tâches selon le filtre actif
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });
  
  // Trier les tâches
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; // Trier par priorité décroissante
    } else { // 'date'
      return new Date(a.createdAt) - new Date(b.createdAt); // Trier par date croissante
    }
  });
  
  return (
    <div className="task-list-container">
      <div className="task-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            En cours
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Terminées
          </button>
        </div>
        
        <div className="sort-controls">
          <label>
            Trier par:
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Priorité</option>
              <option value="date">Date de création</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="task-items">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={onDeleteTask} 
              onToggleComplete={onToggleComplete}
            />
          ))
        ) : (
          <p className="no-tasks">Aucune tâche à afficher</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;