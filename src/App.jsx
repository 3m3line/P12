import { useState } from 'react';

import data from './Projets-BD.json'
import { getUniqueTechnologies, getFilteredProjects } from './Fonctions/dataFiltres'

import './App.scss';
import NavBar from './Containers/NavBar';
import FormContact from './Containers/FormContact';

import Card from './Components/Card';

import FilterButtons from './Containers/FilterButton';


function App() {
  const [selectedTech, setSelectedTech] = useState(null); //Technologie sélectionnée
  const [showProjects, setShowProjects] = useState(false); //Contrôle l'affichage des projets
  const [selectedType, setSelectedType] = useState(null); // Type de projet sélectionné

  //fonction pour le tri en entonnoir
  const getProjects = () => {
    let filteredProjects = data;
    // Si un type est sélectionné, filtrer par type
    if (selectedType) {
      filteredProjects = filteredProjects.filter((data) => data.type === selectedType);
    }
    // Ensuite, filtrer par technologie si une technologie est sélectionnée
    if (selectedTech) {
      filteredProjects = filteredProjects.filter((data) => data.technologie.includes(selectedTech));
    }
    return filteredProjects;
  };

//pour trier en fonction techno
  const handleFilter = (tech) => {
      setSelectedTech(tech);
      setShowProjects(true);
  };

  //pour réinitialisé la techno et afficher tous les projets
  const handleShowAll = () => {
    setSelectedTech(null); 
    setShowProjects(true);
  };

  // Récupérer les technologies disponibles pour le type sélectionné, ou pour tous les projets si aucun type n'est sélectionné
  const availableTechnologies = selectedType
    ? getUniqueTechnologies(data.filter((project) => project.type === selectedType)) // Technologies basées uniquement sur le type sélectionné
    : getUniqueTechnologies(data); // Toutes les technologies si aucun type n'est sélectionné

  //pour le fonctionnement du nav
  const handleNavClick = (navItem) => {
    if (navItem === 'home') {
      setShowProjects(false); // Affiche la page classique (à propos, etc.)
      setSelectedType(null);  // Réinitialise le type
      setSelectedTech(null);  // Réinitialise la technologie
    } else if (navItem === 'contact') {
      setShowProjects(false); // Affiche la section contact, comme dans la page classique
      setSelectedType(null);  // Réinitialise le type
      setSelectedTech(null);  // Réinitialise la technologie
    } else {
      setSelectedType(navItem); // Filtre par type de projet
      setSelectedTech(null); // Réinitialise la technologie
      setShowProjects(true); // Affiche les projets filtrés par type
    }
  };

  return (
    <>
    <header>
    <NavBar handleNavClick={handleNavClick} />
    </header>
    <main>
      <h1 className='visually-hidden'></h1>
      <section className='filters'>
        <h2 className='visually-hidden'>Choisissez un tag pour filtrer les technologies</h2>             
          <FilterButtons 
            data={availableTechnologies}  // Utilise les technologies filtrées
            selectedTech={selectedTech}
            handleFilter={handleFilter}
            handleShowAll={handleShowAll}
            showProjects={showProjects}
          />
      </section>
      <section className='contenu-page'>
        {/* Si aucun projet filtré, affiche : */}
      {!showProjects ? (
         <>
        <article className='section-a-propos'>
          <h2 className='fancy-text'>A propos</h2>
          <p>Après plusieurs années en tant que chef de projet, notamment en gestion de projets web, j'ai choisi de me réorienter vers le développement pour réaliser moi-même des sites de A à Z. Aujourd'hui, en tant que développeuse front-end freelance, je combine mes compétences en gestion de projet et mon expertise technique pour concevoir des sites sur mesure, parfaitement adaptés aux besoins de mes clients.
          <br />
          <br />Spécialisée en front-end, je tends à élargir mes compétences vers le full stack. Mon objectif est de créer des sites à la fois esthétiques et fonctionnels, tout en intégrant des pratiques d'accessibilité et une approche "green web", favorisant une utilisation raisonnée des ressources.
          <br />
          <br />Si vous cherchez une développeuse capable de transformer vos idées en réalité tout en optimisant chaque détail, je serais ravie de discuter de votre projet.</p>
        </article>
        <div className='image-presentation'>
          <h2 className='fancy-text'>Skills</h2>
          <div>
            <img src="./src/assets/fleche-gauche.png" alt="fleche" className='fleche-gauche'/>
            <img src="./src/assets/fleche-haut.png" alt="fleche" className='fleche-haut'/>
            <img src="./src/assets/fleche-droite.png" alt="fleche" className='fleche-droite'/>
          </div>
          <img src="./src/assets/test.png" alt="Représentation en dessin de votre développeuse Web Front" className='dessin'/>
        </div>
        <article className='section-contact' id='contact'>
          <h2 className='fancy-text'>Me contacter</h2>
          <FormContact />
        </article>
        </>
      ):(
        <div className="project-cards">
          {/* Si les projets sont filtrés, on affiche les cartes */}
          {getProjects().map((data) => (
            <Card key={data.id} project={data} />
          ))}
          </div>
          )}
      </section>
    </main>
    <footer>
      
    </footer>
      
    </>
  )
}

export default App
