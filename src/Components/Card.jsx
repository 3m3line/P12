import React, { useState } from 'react';
import './Card.scss'
import Tag from './Tag'
import FormatDescription from '../Fonctions/FormatDescriptionCard'

const HoverCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
        <div
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
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
            <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className='close-modal-contenant'>
                  <span className="close-modal" onClick={handleCloseModal}>
                  &times;
                  </span>
                </div>
                <div className='modal-overflow'>
                  {project.lienSite ? (
                    <a href={project.lienSite} target="_blank" rel="noopener noreferrer">
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