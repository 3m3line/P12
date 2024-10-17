import React, { useState } from 'react';
import './NavBar.scss';

import {getUniqueProjectTypes } from '../Fonctions/dataFiltres'
import data from '../Projets-BD.json'

const NavBar = ({ handleNavClick, selectedType }) => {

    return (
        <nav>
            <div><a href="#" onClick={() => handleNavClick('home')}>Emeline <br></br>Boureaud</a></div>
            <ul>
                {getUniqueProjectTypes(data).map((type, index) => (
                        <li key={index} className={selectedType === type ? 'active' : ''} onClick={() => handleNavClick(type)}>{type}</li>  // Générer un <li> pour chaque type
                    ))}
                <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
            </ul>
        </nav>
)}

export default NavBar;
