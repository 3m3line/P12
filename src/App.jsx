import { useState } from 'react';

import data from './Projets-BD.json'
import { getUniqueTechnologies, filterProjectsByTechnology } from './Fonctions/dataFiltres'

import './App.scss';
import NavBar from './Containers/NavBar';
import Button from './Components/Button';
import FormContact from './Containers/FormContact';

import Card from './Components/Card';


function App() {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleFilter = (tech) => {
      setSelectedTech(tech);
  };

  return (
    <>
    <header>
      <NavBar></NavBar>
    </header>
    <main>
      <h1 className='visually-hidden'></h1>
      <section className='filters'>
        <h2 className='visually-hidden'>Choisissez un tag pour filtrer les technologies</h2>
        <div>
        {getUniqueTechnologies(data).map(tech => (
                        <Button 
                            key={tech} 
                            text={tech} 
                            className="btn-filter" 
                            onClick={() => handleFilter(tech)}
                        />
                    ))}
          </div>
      </section>
      <section className='contenu-page'>
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
          <FormContact></FormContact>
        </article>
      </section>
      <div>
        <Card></Card>
        <Card></Card>
      </div>
    </main>
    <footer>
      
    </footer>
      
    </>
  )
}

export default App
