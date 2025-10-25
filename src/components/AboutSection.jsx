import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import "../styles/about.scss";

const useTilt = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(
        mouseY,
        [-0.5, 0.5],
        ["17.5deg", "-17.5deg"]
    );

    const rotateY = useTransform(
        mouseX,
        [-0.5, 0.5],
        ["-17.5deg", "17.5deg"]
    );

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

const AboutSection = () => {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt();

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
            <motion.div
                className="about-content"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className="about-image"
                    variants={imageVariants}
                    style={{ transform: "translateZ(75px)" }}
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
                    style={{ transform: "translateZ(50px)" }}
                >
                    <motion.h2 variants={titleVariants}>About Me</motion.h2>

                    <motion.p variants={paragraphVariants}>
                        A software developer dedicated to architecting and implementing scalable solutions.
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
            </motion.div>
        </motion.div>
    );
};

export default AboutSection;
