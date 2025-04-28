import React, { useRef } from 'react';

function ImportExport({ tasks, onImport }) {
  const fileInputRef = useRef(null);
  
  // Exporter les tâches vers un fichier JSON
  const handleExport = () => {
    // Création d'un blob avec les données
    const tasksJSON = JSON.stringify(tasks, null, 2);
    const blob = new Blob([tasksJSON], { type: 'application/json' });
    
    // Création d'un URL pour le téléchargement
    const url = URL.createObjectURL(blob);
    
    // Création d'un lien de téléchargement et déclenchement
    const a = document.createElement('a');
    a.href = url;
    a.download = `taches-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyage
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Importer les tâches depuis un fichier JSON
  const handleImport = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        
        // Vérification basique que c'est un tableau de tâches
        if (Array.isArray(importedTasks) && importedTasks.length > 0) {
          onImport(importedTasks);
        } else {
          alert('Le fichier ne contient pas de tâches valides.');
        }
      } catch (error) {
        alert('Erreur lors de la lecture du fichier: ' + error.message);
      }
      
      // Réinitialiser l'input file pour permettre de réimporter le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="import-export-container">
      <h2>Sauvegarde</h2>
      
      <div className="export-section">
        <h3>Exporter les tâches</h3>
        <p>Téléchargez vos tâches dans un fichier JSON</p>
        <button 
          className="btn-export"
          onClick={handleExport}
          disabled={tasks.length === 0}
        >
          Exporter
        </button>
      </div>
      
      <div className="import-section">
        <h3>Importer des tâches</h3>
        <p>Chargez des tâches depuis un fichier JSON</p>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          ref={fileInputRef}
          className="file-input"
        />
        <button 
          className="btn-import"
          onClick={() => fileInputRef.current.click()}
        >
          Sélectionner un fichier
        </button>
      </div>
    </div>
  );
}

export default ImportExport;