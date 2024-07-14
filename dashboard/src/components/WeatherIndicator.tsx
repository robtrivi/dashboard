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
    const [maxTemperature, setMaxTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchWeatherData(city);
            const temperatureKelvin = parseFloat(result.querySelector('temperature')?.getAttribute('value') || '0');
            const temperatureCelsius = temperatureKelvin - 273.15;
            const maxTempKelvin = parseFloat(result.querySelector('temperature_max')?.getAttribute('value') || '0');
            const maxTempCelsius = maxTempKelvin - 273.15;
            const humidity = parseFloat(result.querySelector('humidity')?.getAttribute('value') || '0');
            const condition = result.querySelector('weather')?.getAttribute('value');
            const country = result.querySelector('country')?.textContent;

            setTemperature(temperatureCelsius);
            setMaxTemperature(maxTempCelsius);
            setHumidity(humidity);
            setCondition(condition || '');
            setCountry(country);
        };
        fetchData();
    }, [city]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                    {city} ({country})
                </Typography>
                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TemperatureIndicator title="Temperatura Actual" temperature={temperature ?? 0} />
                    </Grid>
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TemperatureIndicator title="Temperatura Máxima" temperature={maxTemperature ?? 0} />
                    </Grid>
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <HumidityIndicator humidity={humidity ?? 0} />
                    </Grid>
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <ConditionIndicator condition={condition ?? ''} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default WeatherIndicator;
