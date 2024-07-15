import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../api/api';
import { Grid, Typography, Paper, Box } from '@mui/material';
import Indicator from './Indicator';

interface WeatherIndicatorProps {
    city: string;
}

const WeatherIndicator: React.FC<WeatherIndicatorProps> = ({ city }) => {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [feelsLike, setFeelsLike] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [icon, setIcon] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getWeatherData(city);
            const temperatureKelvin = parseFloat(result.querySelector('temperature')?.getAttribute('value') || '0');
            const temperatureCelsius = temperatureKelvin - 273.15;
            const feelsLikeKelvin = parseFloat(result.querySelector('feels_like')?.getAttribute('value') || '0');
            const feelsLikeCelsius = feelsLikeKelvin - 273.15;
            const humidity = parseFloat(result.querySelector('humidity')?.getAttribute('value') || '0');
            const condition = result.querySelector('weather')?.getAttribute('value');
            const country = result.querySelector('country')?.textContent;
            const iconCode = result.querySelector('weather')?.getAttribute('icon');

            setTemperature(temperatureCelsius);
            setFeelsLike(feelsLikeCelsius);
            setHumidity(humidity);
            setCondition(condition || '');
            setCountry(country);
            setIcon(iconCode);
        };
        fetchData();
    }, [city]);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                    {city} ({country})
                </Typography>
                <Grid container spacing={2} direction="column" alignItems="center" sx={{ width: '100%' }}>
                    <Grid item sx={{ width: '100%', textAlign: 'center' }}>
                        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
                        <Indicator title="Temperatura Actual" value={`${temperature?.toFixed(2)}°C`} />
                    </Grid>
                    <Grid item sx={{ width: '100%', textAlign: 'center' }}>
                        <Indicator title="Sensación Térmica" value={`${feelsLike?.toFixed(2)}°C`} />
                    </Grid>
                    <Grid item sx={{ width: '100%', textAlign: 'center' }}>
                        <Indicator title="Humedad" value={`${humidity?.toFixed(2)}%`} />
                    </Grid>
                    <Grid item sx={{ width: '100%', textAlign: 'center' }}>
                        <Indicator title="Condición" value={condition ?? ''} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default WeatherIndicator;
