import React, { useState, useEffect } from 'react';
import WeatherIndicator from './WeatherIndicator';
import WeatherTable from './WeatherTable';
import WeatherChart from './WeatherChart';
import Indicator from './Indicator';
import { Box, TextField, Typography, Grid, Container, MenuItem, Select, Button } from '@mui/material';
import { fetchHistoricalWeatherData, fetchCoordinates } from '../api/api';

const ecuadorianCities = ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Loja'];

const CitySelector: React.FC = () => {
    const [cityInput, setCityInput] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('Guayaquil'); // Default city
    const [forecastData, setForecastData] = useState<any>(null);
    const [historicalType, setHistoricalType] = useState<string>('temperature');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCity) {
            handleCityChange(selectedCity);
        }
    }, [selectedCity, historicalType]);

    const handleCityChange = async (city: string) => {
        try {
            const { lat, lon, country } = await fetchCoordinates(city);
            if (country !== 'EC') {
                alert('Please enter a city in Ecuador.');
                return;
            }

            setSelectedCity(city);

            // Fetch forecast data for the next 3 days
            const now = new Date();
            const startDate = now.toISOString().split('T')[0];
            now.setDate(now.getDate() + 3);
            const endDate = now.toISOString().split('T')[0];
            const forecast = await fetchHistoricalWeatherData(lat, lon, startDate, endDate, historicalType);
            setForecastData(forecast);
            setError(null);
        } catch (err) {
            console.error('Error fetching city data:', err);
            setError('Error fetching city data. Please try again later.');
        }
    };

    const handleSearchCity = () => {
        if (cityInput.trim() !== '') {
            handleCityChange(cityInput);
        }
    };

    const getValue = (index: number) => {
        let value;
        switch (historicalType) {
            case 'temperature':
                value = forecastData?.daily?.temperature_2m_max?.[index];
                return value !== undefined ? `${value} °C` : 'Cargando...';
            case 'humidity':
                value = forecastData?.daily?.relative_humidity_2m_max?.[index];
                return value !== undefined ? `${value} %` : 'Cargando...';
            case 'precipitation':
                value = forecastData?.daily?.precipitation_sum?.[index];
                return value !== undefined ? `${value} mm` : 'Cargando...';
            default:
                return 'Cargando...';
        }
    };

    const getWeatherCondition = (index: number) => {
        return forecastData?.daily?.weather?.[index] || 'clouds';
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom align="center">Dashboard de Clima</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Buscar ciudad"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleSearchCity} fullWidth>Buscar</Button>
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={historicalType}
                        onChange={(e) => setHistoricalType(e.target.value)}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 4, backgroundColor: '#d0f0c0' }}  // Verde para el selector
                    >
                        <MenuItem value="temperature">Temperatura</MenuItem>
                        <MenuItem value="humidity">Humedad</MenuItem>
                        <MenuItem value="precipitation">Precipitación</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">Pronósticos</Typography>
                </Grid>
                {error ? (
                    <Typography variant="body1" color="error">{error}</Typography>
                ) : (
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={4}>
                            <Indicator 
                                title="Pronóstico Día 1" 
                                value={getValue(0)} 
                                icon={getWeatherCondition(0)} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Indicator 
                                title="Pronóstico Día 2" 
                                value={getValue(1)} 
                                icon={getWeatherCondition(1)} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Indicator 
                                title="Pronóstico Día 3" 
                                value={getValue(2)} 
                                icon={getWeatherCondition(2)} 
                            />
                        </Grid>
                    </Grid>
                )}
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={4}>
                        <WeatherIndicator city={selectedCity} />
                    </Grid>
                    <Grid item xs={8}>
                        <WeatherChart city={selectedCity} historicalType={historicalType} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <WeatherTable cities={ecuadorianCities} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CitySelector;
