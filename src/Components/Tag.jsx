import './Tag.scss'

const Tag = ({ text}) => {
    return (
      <div className="tag" role="note" aria-label={`Technologie utilisée: ${text}`}>
        {text}
      </div>
    );
  };
  
  export default Tag;