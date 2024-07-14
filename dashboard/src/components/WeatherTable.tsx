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
            const now = new Date().getTime();
            const localStorageKey = `weatherData_allCities`;

            const cachedData = localStorage.getItem(localStorageKey);
            const cachedTime = localStorage.getItem(`${localStorageKey}_time`);

            if (cachedData && cachedTime && now - parseInt(cachedTime) < 3600000) { // 1 hour in milliseconds
                const parser = new DOMParser();
                const data = JSON.parse(cachedData).map((xmlString: string) => parser.parseFromString(xmlString, "application/xml"));
                setWeatherData(data);
            } else {
                const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
                setWeatherData(data);

                const serializer = new XMLSerializer();
                const serializedData = data.map(doc => serializer.serializeToString(doc));
                localStorage.setItem(localStorageKey, JSON.stringify(serializedData));
                localStorage.setItem(`${localStorageKey}_time`, now.toString());
            }
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
                    {weatherData.map((data, index) => {
                        const city = cities[index];
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
