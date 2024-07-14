import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface WeatherTableProps {
    cities: string[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ cities }) => {
    const [weatherData, setWeatherData] = useState<Document[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
            setWeatherData(data);
        };
        fetchData();
    }, [cities]);

    return (
        <TableContainer component={Paper}>
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
                    {weatherData.map((data, index) => {
                        const city = cities[index];
                        const country = data.querySelector('country')?.textContent;
                        const temperature = data.querySelector('temperature')?.getAttribute('value');
                        const humidity = data.querySelector('humidity')?.getAttribute('value');
                        const condition = data.querySelector('weather')?.getAttribute('value');
                        return (
                            <TableRow key={city}>
                                <TableCell>{city}</TableCell>
                                <TableCell>{country}</TableCell>
                                <TableCell>{temperature}</TableCell>
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
