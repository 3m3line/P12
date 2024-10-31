import './FormatDescriptionCard.scss'

const FormatDescription = ({ description }) => {
    // Sépare la description en sections
    const sections = description.split('MA CONTRIBUTION :');
    const objectiveText = sections[0].trim(); // Texte avant "MA CONTRIBUTION"
    const contributionText = sections[1].trim(); // Texte après "MA CONTRIBUTION"
  
    return (
      <div className="texteCard">
        {/* Mise en forme pour la partie "OBJECTIF" */}
        <h3 className='subtitle-card'>{objectiveText.split(':')[0]} :</h3>
        <p>
          {objectiveText.split(':')[1]?.trim()}<br /><br />
        </p>
        {/* Mise en forme pour "MA CONTRIBUTION" */}
        <h3 className='subtitle-card'>MA CONTRIBUTION :</h3>
        <ul className="listeCard" aria-label="Liste des contributions">
          {contributionText.split('- ').map((item, index) => {
            if (item.trim() !== "") {
              return <li className="elt-listeCard" key={index}>- {item.trim()}</li>;
            }
            return null; // Ignore les lignes vides
          })}
        </ul>
      </div>
    );
  };
  
  export default FormatDescription;