import React, { useEffect, useState } from 'react';
import './BackToTop.scss'

const BackToTop = () => {
    const [visible, setVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsHovered(false);
    };

    return (
        <a href="#" className="back-to-top" 
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        style={{ display: visible ? 'block' : 'none' }}
        aria-label="Retour en haut de la page">
            <img src={isHovered ? "/assets/back-to-top_hover.svg" : "/assets/back-to-top.svg"}
             alt="arrow back to top" />
        </a>
    );
};

export default BackToTop;