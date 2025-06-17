import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    Chip,
    useTheme
} from '@mui/material';
import '../styles/skills.scss';

const SkillsSection = () => {
    const theme = useTheme();
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML' },
                { name: 'CSS/SASS' },
                { name: 'JavaScript' },
                { name: 'React' },
                { name: 'Material UI' }
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Spring Boot' },
                { name: 'Java' },
                { name: 'MySQL' },
                { name: 'PostgreSQL' },
                { name: 'Firebase' }
            ]
        },
        {
            category: 'Tools',
            items: [
                { name: 'Git' },
                { name: 'Vite' },
                { name: 'Docker' },
                { name: 'Figma' }
            ]
        },
        {
            category: 'Other',
            items: [
                { name: 'Responsive Design' },
                { name: 'Progressive Web Apps' },
                { name: 'Web Performance' }
            ]
        }
    ];

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

    return (
        <Box
            component={motion.div}
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="section-title">
                Skills & Technologies
            </h2>

            <Box className="skills-content">
                {skills.map((skillGroup, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        variants={itemVariants}
                        className="skill-group"
                    >
                        <Typography
                            className="skill-category"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                                color: '#333',
                                mb: 2
                            }}
                        >
                            {skillGroup.category}
                        </Typography>
                        <Box className="skill-chips">
                            {skillGroup.items.map((skill, i) => (
                                <Chip
                                    key={i}
                                    label={skill.name}
                                    sx={{
                                        backgroundColor: 'rgba(230, 57, 70, 0.1)',
                                        color: '#333',
                                        border: '1px solid rgba(230, 57, 70, 0.2)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(230, 57, 70, 0.2)'
                                        },
                                        height: '32px',
                                        '& .MuiChip-label': {
                                            px: 2,
                                            fontSize: '1.25rem',
                                            fontWeight: 500
                                        }
                                    }}
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
