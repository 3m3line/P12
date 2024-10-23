import React, { useState, useEffect, useRef  } from 'react';
import './Card.scss'
import Tag from './Tag'
import FormatDescription from '../Fonctions/FormatDescriptionCard'

const HoverCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0); 

  const cardRef = useRef(null); // Référence à la carte pour l'Observer

  // Gére les événements de survol
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
    // Gére l'ouverture et la fermeture de la modale
    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Gère le clic sur l'overlay
    const handleOverlayClick = (e) => {
        // Vérifie si le clic est en dehors de la modale
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };
    
    // Utiliser Intersection Observer pour gérer la visibilité de la carte
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            const bounding = entry.boundingClientRect;
            const rootBounds = entry.rootBounds;
  
            setVisibilityRatio(ratio);
  
            if (cardRef.current) {
              if (ratio >= 0.99) {
                // Si la carte est entièrement visible, retirer le dégradé
                cardRef.current.style.setProperty('mask-image', 'none');
              } else if (bounding.top >= rootBounds.top) {
                // Si la carte entre ou sort par le bas, appliquer le dégradé
                cardRef.current.style.setProperty(
                  'mask-image',
                  `linear-gradient(to top, rgba(0, 0, 0, 0) ${((1 - ratio) * 100)}%, rgba(0, 0, 0, 1) 100%)`
                );
              } else {
                // Si la carte entre ou sort par le haut, retirer le dégradé
                cardRef.current.style.setProperty('mask-image', 'none');
              }
            }
          });
        },
        { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
      );
  
      if (cardRef.current) observer.observe(cardRef.current);
      return () => observer.disconnect();
    }, []);

  return (
    <>
        <div
        ref={cardRef}
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        role="button" // Indique que cet élément est cliquable
        tabIndex="0" // Rendre l'élément focusable
        aria-label={`Détails du projet: ${project.title}`} // Aide à comprendre l'élément pour les lecteurs d'écran
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()} // Gérer l'accessibilité au clavier
        >
            {/* Affiche l'image selon l'état isHovered */}
            <img
                src={isHovered ? project.cover : project.dessin }
                alt={isHovered ? 'Photo' : 'Dessin'}
                className={`card-image ${isHovered ? 'hovered' : ''}`}
            />
        </div>

        {/* Modale */}
        {isModalOpen && (
            <div className="modal-overlay" onClick={handleOverlayClick} aria-modal="true">
            <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
                <div className='close-modal-contenant'>
                  <span className="close-modal" onClick={handleCloseModal} aria-label="Fermer la modale">
                  &times;
                  </span>
                </div>
                <div className='modal-overflow'>
                  {project.lienSite ? (
                    <a href={project.lienSite} target="_blank" rel="noopener noreferrer" aria-label={`Visitez le site du projet ${project.title}`}>
                        <img src={project.cover} alt="image projet" className='image-lien'/>
                    </a>
                  ) : (
                    <img src={project.cover} alt="image projet" />
                  )}
                  <div className='tag-container'>
                    {project.technologie.map((tech, index) => (
                      <Tag key={index} text={tech} />
                    ))}
                  </div>
                  <h2>{project.title}</h2>
                  {/* <p>{project.description}</p> */}
                  <FormatDescription description={project.description} />
                  <div className='liens-modale'>
                    <div className='lienSite'><a href={project.lienSite} target="_blank" rel="noopener noreferrer" className={project.lienSite === '' ? 'visually-hidden' : ''}>Lien vers le site</a></div>
                    <div className='lienCode'><a href={project.lienCode} target="_blank" rel="noopener noreferrer" className={project.lienCode === '' ? 'visually-hidden' : ''}>Lien vers le code</a></div>
                  </div>
                </div>
            </div>
            </div>
        )}
    </>
  );
};

export default HoverCard;