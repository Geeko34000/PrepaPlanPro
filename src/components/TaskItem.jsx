import React from 'react';

function TaskItem({ task, onDelete, onToggleComplete }) {
  // Fonction pour déterminer la classe CSS de priorité
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 1:
        return 'priority-very-low';
      case 2:
        return 'priority-low';
      case 3:
        return 'priority-medium';
      case 4:
        return 'priority-high';
      case 5:
        return 'priority-very-high';
      default:
        return 'priority-medium';
    }
  };
  
  // Fonction pour obtenir le libellé de priorité
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 1:
        return 'Très basse';
      case 2:
        return 'Basse';
      case 3:
        return 'Moyenne';
      case 4:
        return 'Haute';
      case 5:
        return 'Très haute';
      default:
        return 'Moyenne';
    }
  };
  
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-title-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="task-checkbox"
          />
          <h3 className={`task-title ${task.completed ? 'completed-title' : ''}`}>{task.title}</h3>
        </div>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(task.id)}
          aria-label="Supprimer"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default TaskItem;