import React, { useState } from 'react';
import './NavBar.scss';

import {getUniqueProjectTypes } from '../Fonctions/dataFiltres'
import data from '../Projets-BD.json'

const NavBar = () => {
    return (
        <nav>
            <div><a href="/">Emeline <br></br>Boureaud</a></div>
            <ul>
                {getUniqueProjectTypes(data).map((type, index) => (
                        <li key={index}>{type}</li>  // Générer un <li> pour chaque type
                    ))}
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
)}

export default NavBar;


//EFFET LIEN ACTIF
// Sélectionne tous les liens de navigation
const navLinks = document.querySelectorAll('nav ul li a');

// Ajoute un événement click à chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Enlève la classe active de tous les liens
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Ajoute la classe active au lien cliqué
        this.classList.add('active');
    });
});