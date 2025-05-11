import React, {useRef} from 'react';
import {motion} from 'framer-motion';
import "../styles/about.scss";

const AboutSection = () => {
    const textRef = useRef(null);
    const imageRef = useRef(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                duration: 0.6
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="about-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2 variants={titleVariants}>About Me</motion.h2>

            <div className="about-content">
                <motion.div
                    className="about-image"
                    ref={imageRef}
                    variants={imageVariants}
                >
                    <img src={'https://res.cloudinary.com/dlajrlzzi/image/upload/v1746077647/9d77b4f8-7318-4e37-8069-b172bde6d8a0_pemxkf.png'} alt="Your Name" />
                </motion.div>

                <motion.div
                    className="about-text"
                    ref={textRef}
                    variants={textVariants}
                >
                    <motion.p variants={paragraphVariants}>
                        A highly motivated full-stack developer dedicated to architecting and implementing scalable.
                        Expertise in developing engaging front-end interfaces with <span className={'highlight-text'}>React</span>,
                        seamlessly integrated with robust back-end systems powered by the Spring framework.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        Over two years of experience in the complete web development lifecycle, contributing to a diverse portfolio of projects ranging from streamlined web presences to sophisticated applications.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        Beyond development, I enjoy staying engaged with technology through gaming, expanding my knowledge through reading.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutSection;
