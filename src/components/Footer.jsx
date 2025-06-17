import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedinIn,
    faGithub,
    faTwitter,
    faFacebook
} from '@fortawesome/free-brands-svg-icons';
import {
    faArrowUp,
    faCopyright,
    faHeart,
    faQuoteLeft,
    faQuoteRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/footer.scss';

const Footer = ({ scrollToSection, sectionIds = ['hero-section', 'projects-section', 'about-section', 'skills-section', 'contact-section'] }) => {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef(null);

    const scrollToTop = (e) => {
        e.preventDefault();
        if (scrollToSection) {
            scrollToSection(0);
            window.location.hash = sectionIds[0];
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        gsap.to(e.currentTarget, {
            rotate: '360deg',
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(e.currentTarget, { rotation: 0 });
            }
        });
    };

    return (
        <footer className="footer" ref={footerRef}>
            <div className="back-to-top">
                <button onClick={scrollToTop} aria-label="Back to top">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>

            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-quote">
                            <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                            <p>
                                "The best way to predict the future is to create it."
                            </p>
                            <FontAwesomeIcon icon={faQuoteRight} className="quote-icon" />
                            <span className="quote-author">- Peter Drucker -</span>
                        </div>
                    </div>

                    <div className="footer-column">
                        <div className="footer-social">
                            <a href="https://github.com/Piplip" className="social-icon" aria-label="GitHub" target={'_blank'}>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/khanh-du-nguyen-1b1106282/" className="social-icon" aria-label="LinkedIn" target={'_blank'}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="https://x.com/NishaYua64898" className="social-icon" aria-label="Twitter" target={'_blank'}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://www.facebook.com/thihongluyen.pham.1" className="social-icon" aria-label="Facebook" target={'_blank'}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>

                    {/* Made with Love Column */}
                    <div className="footer-column">
                        <div className="made-with-love">
                            <p>Made with</p>
                            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                            <p>in Vietnam</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">
                    <FontAwesomeIcon icon={faCopyright} />
                    <p>{currentYear} Nguyen Khanh Du. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
