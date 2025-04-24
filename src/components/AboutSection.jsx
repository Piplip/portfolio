import React, {useRef} from 'react';
import {motion} from 'framer-motion';
import Self from "../assets/self.jpg";
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
                    <img src={Self} alt="Your Name" />
                </motion.div>

                <motion.div
                    className="about-text"
                    ref={textRef}
                    variants={textVariants}
                >
                    <motion.p variants={paragraphVariants}>
                        Hello! I'm a passionate frontend developer with a keen eye for design and a love for creating
                        smooth, interactive user experiences. I specialize in React and modern JavaScript frameworks.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        With 3+ years of experience in web development, I've worked on various projects
                        ranging from small business websites to complex web applications.
                    </motion.p>

                    <motion.p variants={paragraphVariants}>
                        When I'm not coding, you can find me hiking, reading, or experimenting with new
                        recipes in the kitchen.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutSection;