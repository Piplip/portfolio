import React from 'react';
import {motion} from 'framer-motion';
import "../styles/about.scss";

const AboutSection = () => {
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
            <div className="about-content">
                <motion.div
                    className="about-image"
                    variants={imageVariants}
                >
                    <div className="image-wrapper">
                        <img
                            src="https://res.cloudinary.com/dlajrlzzi/image/upload/v1746077647/9d77b4f8-7318-4e37-8069-b172bde6d8a0_pemxkf.png"
                            alt="Developer portrait showing professional headshot"
                            loading="lazy"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="about-text"
                    variants={textVariants}
                >
                    <motion.h2 variants={titleVariants}>About Me</motion.h2>

                    <motion.p variants={paragraphVariants}>
                        A highly motivated software developer dedicated to architecting and implementing scalable solutions.
                        Expertise in developing engaging front-end interfaces with <span className="highlight-text">React</span>,
                        seamlessly integrated with robust back-end systems powered by the <span className="highlight-text">Spring</span> framework.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        With a strong foundation in <span className="highlight-text">Java</span> and decent level of <span className="highlight-text">JavaScript</span>,
                        I excel at creating efficient, maintainable code that meets the needs of both users and stakeholders.
                        My passion for technology drives me to continuously learn and adapt to new challenges in the ever-evolving software landscape.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        Beyond development, I enjoy staying engaged with technology through gaming, expanding my knowledge through
                        continuous learning, and contributing to open-source projects in the developer community.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutSection;
