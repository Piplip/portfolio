import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    Chip,
    useTheme
} from '@mui/material';
import Particles from './shared/Particles';
import './shared/Particles.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGit, FaJava } from 'react-icons/fa';
import '../styles/skills.scss';

const SkillsSection = () => {
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML', icon: <FaHtml5 /> },
                { name: 'CSS', icon: <FaCss3Alt /> },
                { name: 'JavaScript', icon: <FaJs /> },
                { name: 'React', icon: <FaReact /> },
                { name: 'Material UI' },
                { name: 'Vite' },
                { name: 'Responsive Design' },
                { name: 'SEO' },
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Spring Boot' },
                { name: 'Java', icon: <FaJava /> },
                { name: 'MySQL' },
                { name: 'Firebase' },
                { name: 'jOOQ' },
                { name: 'Maven' },
            ]
        },
        {
            category: 'Tools',
            items: [
                { name: 'Git', icon: <FaGit /> },
                { name: 'Google Cloud' }
            ]
        },
        {
            category: 'Other',
            items: [
                { name: 'Project Management' },
                { name: 'Microservices' },
                { name: 'Web Security' },
                { name: 'LLM Utilization' },
            ]
        }
    ];

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

    return (
        <Box
            component={motion.div}
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <Particles
                className="skills-particles"
                particleCount={100}
                particleColors={['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557']}
                speed={0.1}
                particleBaseSize={2}
            />
            <h2 className="section-title">
                Skills
            </h2>

            <Box className="skills-content">
                {skills.map((skillGroup, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        variants={itemVariants}
                        className={`skill-group ${skillGroup.category.toLowerCase()}`}>
                        <Typography
                            className="skill-category">
                            {skillGroup.category}
                        </Typography>
                        <Box className="skill-chips">
                            {skillGroup.items.map((skill, i) => (
                                <Chip
                                    key={i}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {skill.icon && skill.icon}
                                            {skill.name}
                                        </Box>
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SkillsSection;
