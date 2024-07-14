import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/api';

import { Box, Typography } from '@mui/material';

interface WeatherIndicatorProps {
    city: string;
}

const WeatherIndicator: React.FC<WeatherIndicatorProps> = ({ city }) => {
    const [data, setData] = useState<Document | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchWeatherData(city);
            setData(result);
        };
        fetchData();
    }, [city]);

    if (!data) return <Typography>Cargando...</Typography>;

    const temperature = data.querySelector('temperature')?.getAttribute('value');
    const humidity = data.querySelector('humidity')?.getAttribute('value');
    const condition = data.querySelector('weather')?.getAttribute('value');
    const country = data.querySelector('country')?.textContent;

    return (
        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '8px', mb: 2 }}>
            <Typography variant="h6">{city}</Typography>
            <Typography>País: {country}</Typography>
            <Typography>Temperatura: {temperature}°C</Typography>
            <Typography>Humedad: {humidity}%</Typography>
            <Typography>Condición: {condition}</Typography>
        </Box>
    );
};

export default WeatherIndicator;
