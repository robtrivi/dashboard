import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface IndicatorProps {
    title: string;
    value: string | number;
    icon?: string;
    sizeColumn?: number;
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

const Indicator: React.FC<IndicatorProps> = ({ title, value, icon, sizeColumn = 12 }) => {
    return (
        <Grid item lg={sizeColumn} xs={12} sx={{ display: 'flex' }}>
            <Paper 
                elevation={1} 
                sx={{ 
                    py: 2, 
                    textAlign: 'center', 
                    borderRadius: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent:'center', 
                    width: '100%',
                    flexGrow: 1, 
                    transition: 'background-color 0.3s', 
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    } 
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    {icon && getWeatherIcon(icon)}
                    <Typography variant="h5" sx={{ ml: icon ? 1 : 0 }}>{value}</Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Indicator;
