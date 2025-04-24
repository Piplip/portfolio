import React, { useEffect, useState } from 'react';
import '../styles/custom-cursor.scss';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = () => setIsHovering(true);
        const handleMouseOut = () => setIsHovering(false);

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseOver);
            el.addEventListener('mouseleave', handleMouseOut);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseOver);
                el.removeEventListener('mouseleave', handleMouseOut);
            });
        };
    }, []);

    return (
        <div
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        />
    );
};

export default CustomCursor;