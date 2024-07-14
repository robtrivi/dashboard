import React, { useState, useEffect } from 'react';
import WeatherIndicator from './WeatherIndicator';
import WeatherTable from './WeatherTable';
import WeatherChart from './WeatherChart';
import { Box, Select, MenuItem, Typography, Grid } from '@mui/material';
import { fetchWeatherData } from '../api/api';

const cities = ['London', 'New York', 'Tokyo', 'Sydney'];

const CitySelector: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
    const [maxTemp, setMaxTemp] = useState<number | null>(null);

    useEffect(() => {
        const fetchMaxTemp = async () => {
            const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
            const temperatures = data.map(xml => parseFloat(xml.querySelector('temperature')?.getAttribute('value') || '0'));
            setMaxTemp(Math.max(...temperatures));
        };
        fetchMaxTemp();
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Dashboard de Clima</Typography>
            <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                displayEmpty
                sx={{ mb: 4 }}
            >
                {cities.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
            </Select>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <WeatherIndicator city={selectedCity} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Temperatura Máxima: {maxTemp}°C</Typography>
                </Grid>
                <Grid item xs={12}>
                    <WeatherTable cities={cities} />
                </Grid>
                <Grid item xs={12}>
                    <WeatherChart cities={cities} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CitySelector;
