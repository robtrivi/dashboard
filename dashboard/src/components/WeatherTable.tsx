import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../api/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface WeatherTableProps {
    cities: string[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ cities }) => {
    const [weatherData, setWeatherData] = useState<{ [key: string]: Document }>({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all(cities.map(async (city) => {
                const result = await getWeatherData(city);
                return { city, data: result };
            }));

            const weatherDataObject: { [key: string]: Document } = {};
            data.forEach(({ city, data }) => {
                weatherDataObject[city] = data;
            });

            setWeatherData(weatherDataObject);
        };

        fetchData();
    }, [cities]);

    return (
        <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                        <TableCell sx={{ color: '#fff' }}>Ciudad</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Temperatura (°C)</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Humedad (%)</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Condición</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cities.map((city) => {
                        const data = weatherData[city];
                        if (!data) {
                            return (
                                <TableRow key={city}>
                                    <TableCell colSpan={4}>Cargando datos...</TableCell>
                                </TableRow>
                            );
                        }
                        const temperatureKelvin = parseFloat(data.querySelector('temperature')?.getAttribute('value') || '0');
                        const temperatureCelsius = temperatureKelvin - 273.15;
                        const humidity = data.querySelector('humidity')?.getAttribute('value');
                        const condition = data.querySelector('weather')?.getAttribute('value');
                        return (
                            <TableRow key={city} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                <TableCell>{city}</TableCell>
                                <TableCell>{temperatureCelsius.toFixed(2)}</TableCell>
                                <TableCell>{humidity}</TableCell>
                                <TableCell>{condition}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WeatherTable;
