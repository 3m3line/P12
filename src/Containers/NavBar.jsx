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
            <div><a href="#" onClick={() => handleNavClick('home')}>Emeline <br></br>Boureaud</a></div>
            <div>
            <div className={`burger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                {/* Icône du burger */}
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'menu-open' : ''}>
                {getUniqueProjectTypes(data).map((type, index) => (
                        <li key={index} className={selectedType === type ? 'active' : ''} onClick={() => handleNavClick(type)}>{type}</li>  // Générer un <li> pour chaque type
                    ))}
                <li><a href="#" onClick={() => handleNavClick('contact')}>Contact</a></li>
            </ul>
            </div>
        </nav>
)}

export default NavBar;
