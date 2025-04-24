import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/skills.scss';

const SkillsSection = () => {
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML', level: 95 },
                { name: 'CSS/SASS', level: 90 },
                { name: 'JavaScript', level: 88 },
                { name: 'React', level: 85 },
                { name: 'Vue.js', level: 80 },
                { name: 'Tailwind CSS', level: 92 }
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Node.js', level: 78 },
                { name: 'Express', level: 75 },
                { name: 'MongoDB', level: 70 },
                { name: 'Firebase', level: 80 }
            ]
        },
        {
            category: 'Tools',
            items: [
                { name: 'Git', level: 85 },
                { name: 'Webpack', level: 75 },
                { name: 'Vite', level: 88 },
                { name: 'Figma', level: 82 },
                { name: 'Adobe XD', level: 75 }
            ]
        },
        {
            category: 'Other',
            items: [
                { name: 'Responsive Design', level: 95 },
                { name: 'Progressive Web Apps', level: 80 },
                { name: 'SEO Basics', level: 75 },
                { name: 'Web Performance', level: 85 }
            ]
        }
    ];

    // Additional skills for the badges section
    const allSkills = skills.flatMap(category =>
        category.items.map(item => item.name)
    );

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Initialize progress bars when they come into view
    const initProgressBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach((bar, index) => {
                    const delay = index * 0.1;
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, delay * 1000);
                });
                observer.unobserve(entry.target);
            }
        });
    };

    // Initialize skill meters when they come into view
    const initSkillMeters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const meters = entry.target.querySelectorAll('.skill-meter');
                meters.forEach((meter, index) => {
                    const delay = index * 0.1;
                    setTimeout(() => {
                        meter.style.setProperty('--percent', meter.getAttribute('data-percent'));
                    }, delay * 1000);
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsRef = useRef(null);
    const metersRef = useRef(null);

    useEffect(() => {
        if (skillsRef.current) {
            const observer = new IntersectionObserver(initProgressBars, {
                threshold: 0.2,
                rootMargin: "0px"
            });
            observer.observe(skillsRef.current);
        }

        if (metersRef.current) {
            const observer = new IntersectionObserver(initSkillMeters, {
                threshold: 0.2,
                rootMargin: "0px"
            });
            observer.observe(metersRef.current);
        }

        // GSAP animation for skill badges
        gsap.fromTo('.skill-badge',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.skill-badges',
                    start: 'top 80%'
                }
            }
        );

        return () => {
            // Cleanup
        };
    }, []);

    // Randomized pastel colors for badges
    const getRandomPastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 80%)`;
    };

    return (
        <motion.div
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h2 variants={itemVariants}>My Skills</motion.h2>

            {/* Skill Categories with Progress Bars */}
            <div className="skills-grid" ref={skillsRef}>
                {skills.map((skillGroup, index) => (
                    <motion.div
                        className="skill-category"
                        key={index}
                        variants={itemVariants}
                    >
                        <h3>{skillGroup.category}</h3>
                        <div className="skill-list">
                            {skillGroup.items.map((skill, i) => (
                                <div className="skill-item" key={i}>
                                    <span>{skill.name}</span>
                                    <div className="skill-progress-bar">
                                        <div
                                            className="progress-fill"
                                            data-width={`${skill.level}%`}
                                            style={{ width: '0%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Skill Badges (Alternative Visual) */}
            <motion.div
                className="skill-badges"
                variants={itemVariants}
            >
                {allSkills.map((skill, index) => (
                    <div className="skill-badge" key={index}>
                        {skill}
                    </div>
                ))}
            </motion.div>

            {/* Circular Skill Meters (Top Skills) */}
            <motion.div
                className="skill-meters"
                ref={metersRef}
                variants={itemVariants}
            >
                {skills[0].items.slice(0, 4).map((skill, index) => (
                    <div
                        className="skill-meter"
                        key={index}
                        data-percent={skill.level}
                        style={{ '--percent': 0 }}
                    >
                        <svg>
                            <circle cx="60" cy="60" r="50"></circle>
                            <circle cx="60" cy="60" r="50"></circle>
                        </svg>
                        <div className="skill-meter-info">
                            <h4>{skill.name}</h4>
                            <span>{skill.level}%</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SkillsSection;