import React from 'react';
import { motion } from 'framer-motion';
import { 
    Box, 
    Typography, 
    Paper, 
    LinearProgress, 
    Chip,
    Grid,
    Card,
    CardContent,
    Divider,
    useTheme
} from '@mui/material';
import '../styles/skills.scss';

const SkillsSection = () => {
    const theme = useTheme();
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML', level: 95 },
                { name: 'CSS/SASS', level: 90 },
                { name: 'JavaScript', level: 80 },
                { name: 'React', level: 85 },
                { name: 'Material UI', level: 90 }
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Spring Boot', level: 85 },
                { name: 'Java', level: 85 },
                { name: 'MySQL', level: 75 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'Firebase', level: 75 },
            ]
        },
        {
            category: 'Tools',
            items: [
                { name: 'Git', level: 80 },
                { name: 'Vite', level: 80 },
                { name: 'Docker', level: 70 },
                { name: 'Figma', level: 85 },
            ]
        },
        {
            category: 'Other',
            items: [
                { name: 'Responsive Design', level: 90 },
                { name: 'Progressive Web Apps', level: 80 },
                { name: 'Web Performance', level: 80 }
            ]
        }
    ];

    // Calculate average for each category
    const categoryAverages = skills.map(category => ({
        name: category.category,
        average: Math.round(category.items.reduce((acc, item) => acc + item.level, 0) / category.items.length)
    }));

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
            <Box
                component={motion.div}
                variants={itemVariants}
                className="chart-container"
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.1), transparent)',
                            zIndex: -1
                        }
                    }}
                >
                    {categoryAverages.map((category, index) => (
                        <Box key={index} className="category-average">
                            <Typography className="category-name">
                                {category.name}
                            </Typography>
                            <Box className="average-progress">
                                <Box 
                                    className="progress-fill"
                                    sx={{ width: `${category.average}%` }}
                                />
                            </Box>
                            <Typography className="average-value">
                                {category.average}%
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            </Box>

            <Grid container spacing={4} className="skills-grid">
                {skills.map((skillGroup, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper 
                            component={motion.div}
                            variants={itemVariants}
                            className="skill-card"
                        >
                            <Typography className="skill-category">
                                {skillGroup.category}
                            </Typography>
                            {skillGroup.items.map((skill, i) => (
                                <Box key={i} className="skill-item">
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography className="skill-name">
                                            {skill.name}
                                        </Typography>
                                        <Typography className="skill-level">
                                            {skill.level}%
                                        </Typography>
                                    </Box>
                                    <Box className="progress-bar">
                                        <Box 
                                            className="progress-fill"
                                            sx={{ width: `${skill.level}%` }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SkillsSection;