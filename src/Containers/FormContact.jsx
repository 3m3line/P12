import './FormContact.scss'
import Button from "../Components/Button";

const FormContact = () => {
    return (
        <form action="https://formspree.io/f/xqakkbyl"
        method="POST"
        aria-label="Formulaire de contact">
            <label htmlFor="Nom ou entreprise" className='visually-hidden'>Votre nom ou le nom de l'entreprise</label>
            <input type="text" 
            id="nom-entreprise" 
            name="Nom ou entreprise" 
            placeholder="Votre nom ou votre entreprise" required
            aria-required="true" /> 
            // Indique que le champ est requis
            <label htmlFor="Email" className='visually-hidden'>Votre adresse email</label>
            <input type="text" 
            id="email" name="email" 
            placeholder="Votre adresse email" required 
            aria-required="true"/>
            <label htmlFor="Message" className='visually-hidden'>Votre message</label>
            <textarea type="text" id="message" name="Message" 
            placeholder="Votre message" required 
            aria-required="true"/>
            <Button 
            text="Envoyer" 
            className="btn-form" 
            type="submit"
            aria-label="Envoyer le message"
          />
        </form>
    )
}

export default FormContact;