import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/api';
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

    const localStorageKey = `weatherData_${city}`;

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date().getTime();
            const cachedData = localStorage.getItem(localStorageKey);
            const cachedTime = localStorage.getItem(`${localStorageKey}_time`);

            if (cachedData && cachedTime && now - parseInt(cachedTime) < 3600000) { // 1 hour in milliseconds
                const data = JSON.parse(cachedData);
                setTemperature(data.temperature);
                setFeelsLike(data.feelsLike);
                setHumidity(data.humidity);
                setCondition(data.condition);
                setCountry(data.country);
            } else {
                const result = await fetchWeatherData(city);
                const temperatureKelvin = parseFloat(result.querySelector('temperature')?.getAttribute('value') || '0');
                const temperatureCelsius = temperatureKelvin - 273.15;
                const feelsLikeKelvin = parseFloat(result.querySelector('feels_like')?.getAttribute('value') || '0');
                const feelsLikeCelsius = feelsLikeKelvin - 273.15;
                const humidity = parseFloat(result.querySelector('humidity')?.getAttribute('value') || '0');
                const condition = result.querySelector('weather')?.getAttribute('value');
                const country = result.querySelector('country')?.textContent;

                const weatherData = {
                    temperature: temperatureCelsius,
                    feelsLike: feelsLikeCelsius,
                    humidity: humidity,
                    condition: condition || '',
                    country: country
                };

                setTemperature(temperatureCelsius);
                setFeelsLike(feelsLikeCelsius);
                setHumidity(humidity);
                setCondition(condition || '');
                setCountry(country);

                localStorage.setItem(localStorageKey, JSON.stringify(weatherData));
                localStorage.setItem(`${localStorageKey}_time`, now.toString());
            }
        };
        fetchData();
    }, [city, localStorageKey]);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                    {city} ({country})
                </Typography>
                <Grid container spacing={2} direction="column" alignItems="center" sx={{ width: '100%' }}>
                    <Grid item sx={{ width: '100%' }}>
                        <Indicator title="Temperatura Actual" value={`${temperature?.toFixed(2)}°C`} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <Indicator title="Sensación Térmica" value={`${feelsLike?.toFixed(2)}°C`} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <Indicator title="Humedad" value={`${humidity?.toFixed(2)}%`} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <Indicator title="Condición" value={condition ?? ''} icon={condition ?? ''} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default WeatherIndicator;
