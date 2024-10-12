import './FormContact.scss'
import Button from "../Components/Button";

const FormContact = () => {
    return (
        <form>
            <label htmlFor="Nom ou entreprise" className='visually-hidden'>Votre nom ou le nom de l'entreprise</label>
            <input type="text" id="nom-entreprise" name="Nom ou entreprise" placeholder="Votre nom ou votre entreprise" required />
            <label htmlFor="Email" className='visually-hidden'>Votre adresse email</label>
            <input type="text" id="email" name="email" placeholder="Votre adresse email" required />
            <label htmlFor="Message" className='visually-hidden'>Votre message</label>
            <textarea type="text" id="message" name="Message" placeholder="Votre message" required />
            <Button 
            text="Envoyer" 
            className="btn-form" 
            onClick={() => {}}
          />
        </form>
    )
}

export default FormContact;