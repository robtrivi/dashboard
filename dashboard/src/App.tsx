import React, { useState, useEffect } from 'react';
import CitySelector from './components/CitySelector';
import WeatherIndicator from './components/WeatherIndicator';
import WeatherTable from './components/WeatherTable';
import WeatherChart from './components/WeatherChart';
import Indicator from './components/Indicator';
import SearchCityInput from './components/SearchCityInput';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItemButton, ListItemText, Typography, Box, Grid, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { fetchHistoricalWeatherData, fetchCoordinates } from './api/api';

const ecuadorianCities = ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Loja'];

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.8rem',
            marginTop: 30,
            marginBottom: 30
        },
    },
});


const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
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
                alert('Ingresa una ciudad de Ecuador.');
                return;
            }

            setSelectedCity(city);

            const now = new Date();
            const startDate = now.toISOString().split('T')[0];
            now.setDate(now.getDate() + 3);
            const endDate = now.toISOString().split('T')[0];
            const forecast = await fetchHistoricalWeatherData(lat, lon, startDate, endDate, historicalType);
            setForecastData(forecast);
            setError(null);
        } catch (err) {
            console.error('Error obteniendo los datos:', err);
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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Menú
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                PaperProps={{ style: { width: '250px' } }}>
                <List>
                    <ListItemButton component="a" href="#city-selector">
                        <ListItemText primary="Busqueda" />
                    </ListItemButton>
                    <ListItemButton component="a" href="#indicators">
                        <ListItemText primary="Indicadores" />
                    </ListItemButton>
                    <ListItemButton component="a" href="#forecast">
                        <ListItemText primary="Pronósticos" />
                    </ListItemButton>
                    <ListItemButton component="a" href="#historical">
                        <ListItemText primary="Histórico" />
                    </ListItemButton>
                    <ListItemButton component="a" href="#summary">
                        <ListItemText primary="Resumen" />
                    </ListItemButton>
                </List>
            </Drawer>
            <Container maxWidth="lg" sx={{ py: 4, mt: 8 }} >
                <Grid container id="city-selector">
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: 40 }} variant="h1" gutterBottom align="center">Daily Ecuador</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchCityInput
                            cityInput={cityInput}
                            setCityInput={setCityInput}
                            handleSearchCity={handleSearchCity}
                        />
                    </Grid>
                    <Grid item id="indicators" alignItems="center" xs={12}>
                        <Typography variant="h2" align="center">Indicadores</Typography>
                        <Grid item xs={12}>
                            <WeatherIndicator city={selectedCity} />
                        </Grid>

                    </Grid>
                    <Grid container xs={12} id="forecast" direction="row">
                        <Grid item xs={12}>
                            <Typography variant="h2" align="center">Pronosticos</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item lg={4} xs={12}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <CitySelector
                                                handleSearchCity={handleSearchCity}
                                                historicalType={historicalType}
                                                setHistoricalType={setHistoricalType}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Grid container spacing={2} direction="column">
                                            <Grid item xs={12} sm={4}>
                                                <Indicator
                                                    title="Pronóstico Día 1"
                                                    value={getValue(0)}
                                                    icon={getWeatherCondition(0)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Indicator
                                                    title="Pronóstico Día 2"
                                                    value={getValue(1)}
                                                    icon={getWeatherCondition(1)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Indicator
                                                    title="Pronóstico Día 3"
                                                    value={getValue(2)}
                                                    icon={getWeatherCondition(2)}
                                                />
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                        
                                    </Grid>

                                </Grid>
                                <Grid item lg={8} xs={12}>
                                    <WeatherChart city={selectedCity} historicalType={historicalType} />
                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} id="summary">
                        <Typography variant="h2" align="center">Resumen de ciudades</Typography>
                        <WeatherTable cities={ecuadorianCities} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default App;