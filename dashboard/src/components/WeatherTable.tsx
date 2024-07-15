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
                    <TableRow>
                        <TableCell>Ciudad</TableCell>
                        <TableCell>País</TableCell>
                        <TableCell>Temperatura (°C)</TableCell>
                        <TableCell>Humedad (%)</TableCell>
                        <TableCell>Condición</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cities.map((city) => {
                        const data = weatherData[city];
                        if (!data) {
                            return (
                                <TableRow key={city}>
                                    <TableCell colSpan={5}>Cargando datos...</TableCell>
                                </TableRow>
                            );
                        }
                        const country = data.querySelector('country')?.textContent;
                        const temperatureKelvin = parseFloat(data.querySelector('temperature')?.getAttribute('value') || '0');
                        const temperatureCelsius = temperatureKelvin - 273.15;
                        const humidity = data.querySelector('humidity')?.getAttribute('value');
                        const condition = data.querySelector('weather')?.getAttribute('value');
                        return (
                            <TableRow key={city}>
                                <TableCell>{city}</TableCell>
                                <TableCell>{country}</TableCell>
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
