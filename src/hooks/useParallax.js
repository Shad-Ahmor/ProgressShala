// hooks/useParallax.js
import { useEffect, useState } from 'react';

// intensity: यह नियंत्रित करता है कि तत्व कितनी तेज़ी से आगे बढ़ेगा (उच्च संख्या = अधिक गति)
const useParallax = (intensity = 0.5) => {
    const [offset, setOffset] = useState(0);

    const handleScroll = () => {
        // Calculate the translation offset based on the scroll position
        // We use Math.min to cap the effect (e.g., stops at 500px of scroll)
        const scrollPosition = window.scrollY;
        
        // This makes the element move *up* relative to the scroll (slower than background)
        const newOffset = Math.min(scrollPosition * intensity, 500); 
        
        setOffset(newOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function
        return () => window.removeEventListener('scroll', handleScroll);
    }, [intensity]);

    // Returns the style object for transform
    return { transform: `translateY(${offset}px)` };
};

export default useParallax;