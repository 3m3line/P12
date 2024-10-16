import Button from '../Components/Button';
import { getUniqueTechnologies} from '../Fonctions/dataFiltres'

const FilterButtons = ({ data = [], selectedTech, handleFilter, handleShowAll, showProjects }) =>{
//   const halfIndex = Math.ceil(getUniqueTechnologies(data).length / 2); // Calcule l'index de séparation
  const halfIndex = Math.ceil(["Tous", ...getUniqueTechnologies(data)].length / 2)
  
  const firstRow = ["Tous", ...getUniqueTechnologies(data)].slice(0, halfIndex); // Boutons pour la première ligne
  const secondRow = ["Tous", ...getUniqueTechnologies(data)].slice(halfIndex);  // Boutons pour la deuxième ligne

  

  return (
    <div className="filter-contenant">
      <div className="btn-ligne">
      {/* <Button
          key="Tous"
          text="Tous"
          className={`btn-filter ${showProjects && selectedTech === null ? 'active' : ''}`} 
          onClick={handleShowAll}  // Remet la sélection à null pour afficher tous les projets
        /> */}
      {firstRow.map((tech, index) => (
          <Button
            key={index}
            text={tech}
            className={`btn-filter ${selectedTech === tech || (tech === "Tous" && showProjects && selectedTech === null) ? 'active' : ''}`}
            onClick={tech === "Tous" ? handleShowAll : () => handleFilter(tech)}
          />
        ))}
      </div>
      <div className="btn-ligne">
      {secondRow.map(tech => (
          <Button 
            key={tech} 
            text={tech} 
            className={`btn-filter ${selectedTech === tech ? 'active' : ''}`} 
            onClick={() => handleFilter(tech)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;