import './Button.scss'

const Button = ({ text, onClick, className, type }) => {
    return (
      <button type={type} className={className} onClick={onClick} aria-label={text}>
        {text}
      </button>
    );
  };
  
  export default Button;