import React, { useState, useEffect } from 'react';
import WeatherIndicator from './WeatherIndicator';
import WeatherTable from './WeatherTable';
import WeatherChart from './WeatherChart';
import { Box, Select, MenuItem, Typography, Grid, Container } from '@mui/material';
import { fetchWeatherData } from '../api/api';

const cities = ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Loja'];

const CitySelector: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
    const [maxTemp, setMaxTemp] = useState<number | null>(null);

    useEffect(() => {
        const fetchMaxTemp = async () => {
            const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
            const temperatures = data.map(xml => parseFloat(xml.querySelector('temperature')?.getAttribute('value') || '0') - 273.15);
            setMaxTemp(Math.max(...temperatures));
        };
        fetchMaxTemp();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>Dashboard de Clima</Typography>
                <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{ mb: 4 }}
                >
                    {cities.map(city => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                </Select>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <WeatherIndicator city={selectedCity} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <WeatherChart city={selectedCity} />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                    <WeatherTable cities={cities} />
                </Box>
            </Box>
        </Container>
    );
};

export default CitySelector;
