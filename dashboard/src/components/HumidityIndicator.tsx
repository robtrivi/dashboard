import React from 'react';
import { Paper, Typography } from '@mui/material';

interface HumidityIndicatorProps {
    humidity: number;
}

const HumidityIndicator: React.FC<HumidityIndicatorProps> = ({ humidity }) => {
    return (
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Humedad</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>{humidity.toFixed(2)}%</Typography>
        </Paper>
    );
};

export default HumidityIndicator;
