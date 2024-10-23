import React, { useState, useEffect, useRef } from 'react';
import './NavBar.scss';

import {getUniqueProjectTypes } from '../Fonctions/dataFiltres'
import data from '../Projets-BD.json'

const NavBar = ({ handleNavClick, selectedType }) => {

    const [menuOpen, setMenuOpen] = useState(false); // Gestion de l'état du menu burger
    const menuRef = useRef(null); // Référence pour le menu

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Inverser l'état d'ouverture du menu
    };

    // Fermer le menu quand on clique en dehors
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false); // Fermer le menu
        }
    };

    // Fermer le menu après clic sur un élément du menu
    const handleMenuClick = (navItem) => {
        handleNavClick(navItem);  // Appel de la fonction de navigation

        // Vérifier si la largeur de l'écran est celle d'un smartphone et fermer le menu
        if (window.innerWidth <= 755) {
            setMenuOpen(false); // Ferme le menu burger
        }
    };

    useEffect(() => {
        // Ajouter un gestionnaire d'événements de clic sur le document
        document.addEventListener('mousedown', handleClickOutside);

        // Nettoyer le gestionnaire d'événements quand le composant est démonté
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav ref={menuRef} aria-label="Navigation principale">
            <div onClick={() => handleNavClick('home')} className='logo'
                role="button" // Indique que c'est un élément cliquable
                tabIndex={0} // pour rendre le logo focusable
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')} // Gestion de l'accessibilité au clavier
                aria-label="Retour à la page d'accueil">Embo</div>
            <div>
            <div className={`burger-icon ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu" // Ajout de l'aria-label
                    role="button" // Indique que c'est un élément cliquable
                    tabIndex={0} // Rendre l'icône burger focusable
                    onKeyDown={(e) => e.key === 'Enter' && toggleMenu()} // Gestion de l'accessibilité au clavier
                    >
                {/* Icône du burger */}
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'menu-open' : ''} role="menu">
                {getUniqueProjectTypes(data).map((type, index) => (
                        <li key={index} className={selectedType === type ? 'active' : ''} 
                        onClick={() => handleMenuClick(type)}
                        role="menuitem" // Indique que c'est un élément de menu
                            tabIndex={0} // Rendre l'élément de menu focusable
                            onKeyDown={(e) => e.key === 'Enter' && handleMenuClick(type)} // Gestion de l'accessibilité au clavier
                            >{type}</li>  // Générer un <li> pour chaque type
                    ))}
                <li><a href="#contact" 
                onClick={() => handleMenuClick('contact')}
                role="menuitem" // Indique que c'est un élément de menu
                            tabIndex={0} // Rendre l'élément de menu focusable
                            onKeyDown={(e) => e.key === 'Enter' && handleMenuClick('contact')} // Gestion de l'accessibilité au clavier
                            >Contact</a></li>
            </ul>
            </div>
        </nav>
)}

export default NavBar;
