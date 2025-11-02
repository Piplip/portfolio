import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Chip } from '@mui/material';

const SkillCard = ({ skillGroup, variants }) => {
    return (
        <Box
            component={motion.div}
            variants={variants}
            className={`skill-group ${skillGroup.category.toLowerCase()}`}>
            <Typography
                className="skill-category">
                {skillGroup.category}
            </Typography>
            <Box className="skill-chips">
                {skillGroup.items.map((skill, i) => (
                    <Chip
                        key={i}
                        label={skill.name}
                        icon={skill.icon}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default SkillCard;
