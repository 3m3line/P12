import { useState} from 'react';

//animation EMBO
export const useAnimation = () => {
    const [emboIsClicked, setEmboIsClicked] = useState(false);
  
    const handleClickEmbo = () => {
      setEmboIsClicked(true);
      setTimeout(() => setEmboIsClicked(false), 600); // Réinitialise après 600ms
    };
  
    return { emboIsClicked, handleClickEmbo };
  };