import React, { useState } from 'react';
import './Card.scss'
import Tag from './Tag'

const HoverCard = () => {
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
                src={isHovered ? './src/assets/images-projet/asl-les-cottages_image.png' : './src/assets/images-projet/asl-les-cottages_dessin.png'}
                alt={isHovered ? 'Photo' : 'Dessin'}
                className="card-image"
            />
        </div>

        {/* Modale */}
        {isModalOpen && (
            <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <span className="close-modal" onClick={handleCloseModal}>
                &times;
                </span>
                <a href="https://asl-lescottages.fr/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/images-projet/asl-les-cottages_image.png" alt="image projet" /></a>
                <div className='tag-container'>
                    <Tag text ="test"/>
                </div>
                <h2>ceci est un test de titre</h2>
                <p>OBJECTIF: L'objectif principal était d'apporter une modification au site vitrine en créant un carrousel dynamique permettant aux utilisateurs de naviguer facilement entre différentes images, avec des flèches et des points indicateurs pour une meilleure expérience utilisateur. Ce carrousel devait être intuitif, responsive et fonctionner de manière fluide sur tous les appareils. MA CONTRIBUTION :- Mise en place des flèches de navigation : En intégrant des images de flèches (gauche et droite) dans le carrousel, j'ai permis aux utilisateurs de passer d'une image à l'autre facilement. J'ai ajouté des event listeners en JavaScript pour gérer les clics sur ces flèches et déclencher les actions nécessaires.-Ajout des bullet points : J'ai introduit des points indicateurs en bas du carrousel pour que les utilisateurs puissent identifier sur quelle slide ils se trouvent. Le point actif était visuellement distingué grâce à des classes CSS spécifiques.-Interactivité du carrousel : Le carrousel devait afficher une nouvelle image et son texte associé à chaque clic, tout en mettant à jour le point correspondant. J'ai utilisé JavaScript pour gérer ces changements via le DOM, en ajustant le contenu et le style en fonction de l'image active.\n-Gestion des conditions de boucle : J'ai veillé à ce que le carrousel fonctionne en boucle. Lorsque l'utilisateur atteignait la dernière image et cliquait à droite, le carrousel revenait à la première image, et inversement pour la première image en cliquant à gauche.</p>
                <div className='liens-modale'>
                <a href="https://asl-lescottages.fr/" target="_blank" rel="noopener noreferrer">Lien vers le site</a>
                <a href="">Lien vers le code</a>
                </div>
            </div>
            </div>
        )}
    </>
  );
};

export default HoverCard;