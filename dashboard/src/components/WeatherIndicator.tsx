import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/api';
import { Grid, Typography, Paper, Box } from '@mui/material';
import TemperatureIndicator from './TemperatureIndicator';
import HumidityIndicator from './HumidityIndicator';
import ConditionIndicator from './ConditionIndicator';

interface WeatherIndicatorProps {
    city: string;
}

const WeatherIndicator: React.FC<WeatherIndicatorProps> = ({ city }) => {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [feelsLike, setFeelsLike] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchWeatherData(city);
            const temperatureKelvin = parseFloat(result.querySelector('temperature')?.getAttribute('value') || '0');
            const temperatureCelsius = temperatureKelvin - 273.15;
            const feelsLikeKelvin = parseFloat(result.querySelector('feels_like')?.getAttribute('value') || '0');
            const feelsLikeCelsius = feelsLikeKelvin - 273.15;
            const humidity = parseFloat(result.querySelector('humidity')?.getAttribute('value') || '0');
            const condition = result.querySelector('weather')?.getAttribute('value');
            const country = result.querySelector('country')?.textContent;

            setTemperature(temperatureCelsius);
            setFeelsLike(feelsLikeCelsius);
            setHumidity(humidity);
            setCondition(condition || '');
            setCountry(country || '');
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
                    <Grid item sx={{ width: '100%' }}>
                        <TemperatureIndicator title="Temperatura Actual" temperature={temperature ?? 0} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <TemperatureIndicator title="Sensación Térmica" temperature={feelsLike ?? 0} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <HumidityIndicator humidity={humidity ?? 0} />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <ConditionIndicator condition={condition ?? ''} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default WeatherIndicator;
