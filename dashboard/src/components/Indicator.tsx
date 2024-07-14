import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface IndicatorProps {
    title: string;
    value: string | number;
    icon?: string;
}

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

const Indicator: React.FC<IndicatorProps> = ({ title, value, icon }) => {
    return (
        <Paper elevation={1} sx={{ py: 2, textAlign: 'center', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                {icon && getWeatherIcon(icon)}
                <Typography variant="h4" sx={{ ml: icon ? 1 : 0 }}>{value}</Typography>
            </Box>
        </Paper>
    );
};

export default Indicator;
