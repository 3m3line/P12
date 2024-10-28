import { useState, useEffect } from 'react';

import data from './Projets-BD.json'
import { getUniqueTechnologies} from './Fonctions/dataFiltres'

import './App.scss';
import NavBar from './Containers/NavBar';
import FormContact from './Containers/FormContact';

import Card from './Components/Card';

import FilterButtons from './Containers/FilterButton';
import BackToTop from './Components/BackToTop';


function App() {
  const [selectedTech, setSelectedTech] = useState(null); //Technologie sélectionnée
  const [showProjects, setShowProjects] = useState(false); //Contrôle l'affichage des projets
  const [selectedType, setSelectedType] = useState(null); // Type de projet sélectionné
  const [showMore, setShowMore] = useState(false); // État pour afficher plus d'infos
  const [showFilter, setShowFilter] = useState(false); //etat pour le collapse des skills
  const [isFilterOpen, setIsFilterOpen] = useState(false); //eat pour savoir si collapse skill ouvert
  const [hasClickedNav, setHasClickedNav] = useState(false); // Suivi des clics de navigation

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
      window.location.hash = `#${tech}`;
  };

  //pour réinitialisé la techno et afficher tous les projets
  const handleShowAll = () => {
    setSelectedTech(null); 
    setShowProjects(true);
    window.location.hash = '';
  };

  // Récupérer les technologies disponibles pour le type sélectionné, ou pour tous les projets si aucun type n'est sélectionné
  const availableTechnologies = selectedType
    ? getUniqueTechnologies(data.filter((project) => project.type === selectedType)) // Technologies basées uniquement sur le type sélectionné
    : getUniqueTechnologies(data); // Toutes les technologies si aucun type n'est sélectionné

  //pour le fonctionnement du nav
  const handleNavClick = (navItem) => {
    setShowMore(false); // Réinitialise info-supp à chaque navigation
    setHasClickedNav(true);

    if (navItem === 'home') {
      setShowProjects(false); // Affiche la page classique (à propos, etc.)
      setSelectedType(null);  // Réinitialise le type
      setSelectedTech(null);  // Réinitialise la technologie
      window.location.hash = ``;
    } else if (navItem === 'contact') {
      setShowProjects(false); // Affiche la section contact, comme dans la page classique
      setSelectedType(null);  // Réinitialise le type
      setSelectedTech(null);  // Réinitialise la technologie
      window.location.hash = '#contact';
    } else {
      setSelectedType(navItem); // Filtre par type de projet
      setSelectedTech(null); // Réinitialise la technologie
      setShowProjects(true); // Affiche les projets filtrés par type
      window.location.hash = ``;
    }
  };

  // Fonction pour afficher ou masquer l'encart d'information supplémentaire
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };


  
  // Fonction pour gérer la taille de l'écran
  const handleResize = () => {
    if (window.innerWidth > 755) {
      setShowFilter(true); // Montre les filtres sur écrans larges
    } else {
      setShowFilter(false); // Cache les filtres sur petits écrans
    }
  };

  //Ajout d'un écouteur d'événements pour redimensionner
  useEffect(() => {
    handleResize(); // Appel initial
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //fonction pour afficher les filtres en collapse pour les tel
  const toggleFilter = () => {
    setShowFilter(prev => !prev); // Bascule l'affichage des filtres
    setIsFilterOpen(!isFilterOpen); // Inverser l'état du triangle en fonction de l'ouverture ou non
  };

  //animations span
  // Utilisation d'un useEffect pour gérer l'animation
  useEffect(() => {
    const emboAnimate = document.querySelector('.embo-animate');
    const dessin = document.querySelector('.dessin');
    const funSpan = document.querySelector('.fun-animate');

    //gère les effets visuels pour funAniMate
    //genere les chemins d'images
    const particleImagesSet1 = Array.from({ length: 15 }, (_, i) => `/assets/fun-image/fun-image_A82f69(${i + 1}).png`); //rouge
    const particleImagesSet2 = Array.from({ length: 16 }, (_, i) => `/assets/fun-image/fun-image_ffd1e7 (${i + 1}).png`); //rose
    const particleImagesSet3 = Array.from({ length: 15 }, (_, i) => `/assets/fun-image/fun-image_c94a4a (${i + 1}).png`); //rouge foncé
    const particleImages = [...particleImagesSet1, ...particleImagesSet2, ...particleImagesSet3];

    // Fonction pour créer des particules autour de "FUN"
    const createFireworks = () => {
      const numberOfParticles = 20;
    
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('img');
        particle.src = particleImages[Math.floor(Math.random() * particleImages.length)];
        particle.className = 'particle';
    
        // Calculer la position en cercle
        const angle = (i * 2 * Math.PI) / numberOfParticles;
        particle.style.setProperty('--x', Math.cos(angle));
        particle.style.setProperty('--y', Math.sin(angle));
    
        // Taille et vitesse aléatoires
        const size = Math.random() * 30 + 20; // taille entre 20px et 50px
        const duration = Math.random() * 1.5 + 1; // durée entre 1s et 2.5s
    
        // Appliquer les propriétés CSS personnalisées
        particle.style.setProperty('--size', `${size}px`);
        particle.style.setProperty('--duration', `${duration}s`);
    
        // Ajouter les particules en arrière-plan
        particle.style.position = 'absolute';
        funSpan.appendChild(particle);
    
        // Supprimer la particule après l'animation
        setTimeout(() => {
          if (particle.parentNode === funSpan) {
            funSpan.removeChild(particle);
          }
        }, duration * 1000);
      }
    };


  // Gère les effets visuels pour 'emboAnimate' et 'dessin'
    const handleMouseEnter = () => {
      dessin.classList.add('invert'); 
      emboAnimate.classList.add('sway');
    };
    const handleMouseLeave = () => {
      dessin.classList.remove('invert'); 
      emboAnimate.classList.remove('sway');
    };
    const handleClick = () => {
     dessin.classList.add('invert'); // Ajoute l'animation sur clic
      emboAnimate.classList.add('sway');
      setTimeout(() => {
        dessin.classList.remove('invert'); // Supprime après l'animation
        emboAnimate.classList.remove('sway');
      }, 1200); // Durée de l'animation
    };
    // Écoutez les événements
    emboAnimate.addEventListener('mouseenter', handleMouseEnter);
    emboAnimate.addEventListener('mouseleave', handleMouseLeave);
    emboAnimate.addEventListener('click', handleClick);
    funSpan.addEventListener('mouseenter', createFireworks);
    funSpan.addEventListener('click', createFireworks);
    // Cleanup des écouteurs
    return () => {
      emboAnimate.removeEventListener('mouseenter', handleMouseEnter);
      emboAnimate.removeEventListener('mouseleave', handleMouseLeave);
      emboAnimate.removeEventListener('click', handleClick);
      funSpan.removeEventListener('mouseenter', createFireworks);
      funSpan.removeEventListener('click', createFireworks);
    };
  }, []); // Dépendance vide pour exécuter une fois

  return (
    <>
    <header role="banner">
    <NavBar handleNavClick={handleNavClick} selectedType={selectedType}/>
    </header>
    <main>
      <h1 className='visually-hidden'></h1>
      <section className='filters' aria-labelledby="filter-title">
        <h2 className='visually-hidden'>Choisissez un tag pour filtrer les technologies</h2>             
        {window.innerWidth <= 755 && ( // Affiche le bouton uniquement sur petits écrans
        <div onClick={toggleFilter} 
        className={`container-toogle ${isFilterOpen ? 'toogle-open' : ' '}`} 
        role="button" 
        aria-expanded={isFilterOpen} 
        aria-controls="filter-buttons"
        tabIndex="0" // permet la navigation clavier
        onKeyDown={(e) => e.key === 'Enter' && toggleFilter()}>
          <p className='skills-toggle'><span className='toggle-text'>Skills</span>
          <span className='triangle'>{isFilterOpen ? '▴' : '▾'}</span>
          </p>
          <p className={`explication-toggle ${isFilterOpen ? 'open' : ' '}`}>(Cliquer pour afficher)</p></div>
        )}
        {(showFilter || window.innerWidth > 755) && ( // Affiche les boutons de filtre
          <FilterButtons 
            id="filter-buttons"
            data={availableTechnologies}  // Utilise les technologies filtrées
            selectedTech={selectedTech}
            handleFilter={handleFilter}
            handleShowAll={handleShowAll}
            showProjects={showProjects}
          />)}
          {window.innerWidth > 755 && (
          <p className={`fancy-text ${!showProjects ? ' ' : 'hide' }`}>Skills</p>)}
      </section>
      <section className='contenu-page'>
        {/* Si aucun projet filtré, affiche : */}
      {!showProjects ? (
         <>
        <article className='section-a-propos'>
          <p className='fancy-text'>Salut !</p>
          <p className='texte-intro'>Je m’appelle <span  className='embo-animate'>EMBO</span> et je suis développeuse web front-end, passionnée par la création de sites <span className='fun-animate'>FUNS</span> et accessibles à tous. 
            < br/> Contactez-moi pour donner vie à vos <span>IDEES</span> !
          </p>
          {/* Ajout du texte détaillé */}
          <p 
          role="button" 
          aria-expanded={showMore} 
          aria-controls="additional-info" 
          tabIndex="0" 
          onClick={toggleShowMore}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleShowMore()}
          className="en-savoir-plus">
                  {showMore ? 'Voir moins' : 'En savoir plus'}
                </p>
                {showMore && (
                  <div className='info-supp'>
                    <p>
                    Après plusieurs années en tant que chef de projet, notamment en gestion de projets web, j’ai souhaité réaliser mes sites de A à Z et suis devenue développeuse web frontend. 
                    < br/>Aujourd'hui, en freelance, je combine mes compétences en gestion de projet avec mon expertise technique pour concevoir des sites sur mesure, parfaitement adaptés à vos besoins.
                    < br/>Bien que spécialisée en frontend, j’élargis mes compétences vers le full stack. Mon objectif est de créer des sites esthétiques et fonctionnels, tout en intégrant des pratiques d'accessibilité et une approche "green web" favorisant une utilisation raisonnée des ressources.
                    < br/>Si vous cherchez une développeuse capable de transformer vos idées en réalité tout en optimisant chaque détail, je serais ravie de discuter de votre projet.
                    </p>
                  </div>
                )}
        </article>
        <div className='image-presentation'>
          <div>
            <img src="/assets/fleche-gauche.png" alt="fleche" className='fleche-gauche fleche'/>
            <img src="/assets/fleche-haut.png" alt="fleche" className='fleche-haut fleche'/>
            <img src="/assets/fleche-droite.png" alt="fleche" className='fleche-droite fleche'/>
          </div>
          <img src="/assets/ma-representation-by-domicercle.png" alt="Représentation en dessin de votre développeuse Web Front, réalisée par Domicercle" title="Illustration réalisée par Domicercle (lien dans le footer)" className='dessin'/>
          <div className="color-overlay"></div>
        </div>
        <article className='section-contact' id='contact'>
          <h2 className='fancy-text'>Me contacter</h2>
          <FormContact />
        </article>
        </>
      ):(
        <div id={selectedType || selectedTech || 'Tous'} className="project-cards">
          {/* Si les projets sont filtrés, on affiche les cartes */}
          {getProjects().map((data) => (
            <Card key={data.id} project={data} index={data.id} />
          ))}
          </div>
          )}
      </section>
    </main>
    <footer role="contentinfo">
      <BackToTop />
      <div>
        <p>© Emeline Boureaud, 2024. Tous droits réservés.</p>
        <p className='barre-separation-footer'>|</p>
        <p>Illustration réalisée par <a href="https://linktr.ee/domicercle" target="_blank" rel="noopener noreferrer">Domicercle</a></p>
      </div>
    </footer>
    </>
  )
}

export default App
