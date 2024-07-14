import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface ConditionIndicatorProps {
    condition: string;
}

const ConditionIndicator: React.FC<ConditionIndicatorProps> = ({ condition }) => {
    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'clear':
            case 'sunny':
                return <WiDaySunny size={32} />;
            case 'clouds':
                return <WiCloudy size={32} />;
            case 'rain':
                return <WiRain size={32} />;
            case 'snow':
                return <WiSnow size={32} />;
            case 'thunderstorm':
                return <WiThunderstorm size={32} />;
            default:
                return <WiCloudy size={32} />;
        }
    };

    return (
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Condición</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                {getWeatherIcon(condition)}
                <Typography variant="h5" sx={{ ml: 1 }}>{condition}</Typography>
            </Box>
        </Paper>
    );
};

export default ConditionIndicator;
