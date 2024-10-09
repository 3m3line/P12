import { useState } from 'react'
import './App.scss'
import NavBar from './Containers/NavBar'
import Button from './Components/Button'

function App() {
  const [count, setCount] = useState(0)

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
          <Button 
            text="Html" 
            className="btn-filter" 
            onClick={() => {}}
          />
          <Button 
            text="Javascript" 
            className="btn-filter" 
            onClick={() => {}}
          />
          <Button 
            text="React" 
            className="btn-filter" 
            onClick={() => {}}
          />
          <Button 
            text="Wordpress" 
            className="btn-filter" 
            onClick={() => {}}
          />
          <Button 
            text="CSS" 
            className="btn-filter" 
            onClick={() => {}}
          />
        </div>
      </section>
      <section className='contenu-page'>
        <article className='section-a-propos'>
          <h2 className='fancy-text'>A propos</h2>
          <p></p>
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
        <article className='section-contact'>
          <h2 className='fancy-text'>Me contacter</h2>
        </article>

      </section>
    </main>
      
    </>
  )
}

export default App
