import React, { useState, useEffect } from 'react';
import "../styles/navbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBriefcase, 
  faUser, 
  faCode, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ scrollToSection, sectionIds = ['hero-section', 'projects-section', 'about-section', 'skills-section', 'contact-section'] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(() => {
        // Handle hash change from URL
        const handleHashChange = () => {
            const currentHash = window.location.hash.substring(1);
            const sectionIndex = sectionIds.indexOf(currentHash);
            
            if (sectionIndex !== -1) {
                setActiveIndex(sectionIndex);
                document.documentElement.style.setProperty('--active-index', sectionIndex);
            }
        };
        
        // Handle custom hash change events from ScrollTrigger
        const handleManualHashChange = (e) => {
            setActiveIndex(e.detail.sectionIndex);
            document.documentElement.style.setProperty('--active-index', e.detail.sectionIndex);
        };
        
        // Add event listeners
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('hashchange:manual', handleManualHashChange);
        
        // Set initial active state based on URL hash
        handleHashChange();
        
        // Cleanup
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('hashchange:manual', handleManualHashChange);
        };
    }, [sectionIds]);
    
    // Handle click on navigation items
    const handleNavClick = (index, sectionId) => {
        // Update active state
        setActiveIndex(index);
        document.documentElement.style.setProperty('--active-index', index);
        
        // Scroll to section using the provided function
        if (scrollToSection) {
            scrollToSection(index);
        }
    };
    
    return (
        <>
            {/* Navigation menu */}
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a 
                                href="#hero-section" 
                                className={`nav-link ${activeIndex === 0 ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(0, 'hero-section');
                                }}
                                data-tooltip="Home"
                            >
                                <FontAwesomeIcon icon={faHome} />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#projects-section" 
                                className={`nav-link ${activeIndex === 1 ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(1, 'projects-section');
                                }}
                                data-tooltip="Projects"
                            >
                                <FontAwesomeIcon icon={faBriefcase} />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#about-section" 
                                className={`nav-link ${activeIndex === 2 ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(2, 'about-section');
                                }}
                                data-tooltip="About"
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#skills-section" 
                                className={`nav-link ${activeIndex === 3 ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(3, 'skills-section');
                                }}
                                data-tooltip="Skills"
                            >
                                <FontAwesomeIcon icon={faCode} />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#contact-section" 
                                className={`nav-link ${activeIndex === 4 ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(4, 'contact-section');
                                }}
                                data-tooltip="Contact"
                            >
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;