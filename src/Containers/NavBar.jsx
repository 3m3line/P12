import React, { useState, useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
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
        <nav ref={menuRef}>
            <div onClick={() => handleNavClick('home')}>Emeline <br></br>Boureaud</div>
            <div>
            <div className={`burger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                {/* Icône du burger */}
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'menu-open' : ''}>
                {getUniqueProjectTypes(data).map((type, index) => (
                        <li key={index} className={selectedType === type ? 'active' : ''} onClick={() => handleMenuClick(type)}>{type}</li>  // Générer un <li> pour chaque type
                    ))}
                {/* <li><Link to='/#contact'>Contact</Link></li> */}
                <li><a href="#contact" onClick={() => handleMenuClick('contact')}>Contact</a></li>
            </ul>
            </div>
        </nav>
)}

export default NavBar;
