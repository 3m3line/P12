import React, { useEffect, useState, useRef } from 'react';
import Button from '../Components/Button';
import { getUniqueTechnologies} from '../Fonctions/dataFiltres'

const FilterButtons = ({ data = [], selectedTech, handleFilter, handleShowAll, showProjects }) =>{

  const [buttonRows, setButtonRows] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      distributeButtons();
    };
  
  // Appel initial pour distribuer les boutons
  distributeButtons();

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  }, [data]); // Ré-exécute lorsque les données changent

  const distributeButtons = () => {
    const allTechnologies = ["Tous", ...data];

    const containerWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth; // Largeur du conteneur
    const buttonWidth = 200;

    // Calcule le nombre maximal de boutons par ligne (7 max)
    const maxButtonsPerRow = Math.min(7, Math.floor(containerWidth / buttonWidth));
    
    let rows = [];
    // 1. Répartition initiale des boutons dans les lignes
    for (let i = 0; i < allTechnologies.length; i += maxButtonsPerRow) {
      rows.push(allTechnologies.slice(i, i + maxButtonsPerRow));
    }

    // 2. Rééquilibrer les lignes si la dernière est trop déséquilibrée
    const totalButtons = allTechnologies.length;
    const rowCount = rows.length;

    // Calculer le nombre idéal de boutons par ligne pour équilibrer
    const idealButtonsPerRow = Math.ceil(totalButtons / rowCount);

    // Réinitialiser les lignes pour redistribuer équitablement les boutons
    let balancedRows = [];
    let currentRow = [];

    allTechnologies.forEach((tech, index) => {
      currentRow.push(tech);
      // Lorsque la ligne atteint le nombre idéal de boutons ou le maximum de 7, on la pousse dans balancedRows
      if (currentRow.length === idealButtonsPerRow || currentRow.length === 7 || index === totalButtons - 1) {
        balancedRows.push(currentRow);
        currentRow = [];
      }
    });

    setButtonRows(rows); // Met à jour l'état avec les nouvelles lignes de boutons
  }
  return (
    <div className="filter-contenant">
      {buttonRows.map((row, rowIndex) => (
        <div className="btn-ligne" key={rowIndex}>
          {row.map(tech => (
            <Button
              key={tech}
              text={tech}
              className={`btn-filter ${selectedTech === tech || (tech === "Tous" && showProjects && selectedTech === null) ? 'active' : ''}`}
              onClick={tech === "Tous" ? handleShowAll : () => handleFilter(tech)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;