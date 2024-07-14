import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface TemperatureIndicatorProps {
    title: string;
    temperature: number;
}

const TemperatureIndicator: React.FC<TemperatureIndicatorProps> = ({ title, temperature }) => {
    return (
        <Paper elevation={1} sx={{ py: 2, textAlign: 'center', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>{temperature.toFixed(2)}°C</Typography>
        </Paper>
    );
};

export default TemperatureIndicator;
