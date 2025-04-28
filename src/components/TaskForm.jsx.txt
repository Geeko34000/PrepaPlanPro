import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(3); // Priorité par défaut à 3 (moyenne)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title,
      description,
      priority: Number(priority),
      createdAt: new Date().toISOString()
    });
    
    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setPriority(3);
  };
  
  return (
    <div className="form-container">
      <h2>Ajouter une tâche</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre*</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Que devez-vous faire?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détails supplémentaires (optionnel)"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priorité (1-5)</label>
          <select 
            id="priority" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">1 - Très basse</option>
            <option value="2">2 - Basse</option>
            <option value="3">3 - Moyenne</option>
            <option value="4">4 - Haute</option>
            <option value="5">5 - Très haute</option>
          </select>
        </div>
        
        <button type="submit" className="btn-add">Ajouter la tâche</button>
      </form>
    </div>
  );
}

export default TaskForm;