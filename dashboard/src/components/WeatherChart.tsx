import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/api';
import { Box, Typography } from '@mui/material';
import { Chart } from 'react-google-charts';

interface WeatherChartProps {
    cities: string[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ cities }) => {
    const [chartData, setChartData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
            const temperatures = data.map(xml => parseFloat(xml.querySelector('temperature')?.getAttribute('value') || '0'));

            const formattedData = [
                ['City', 'Temperature'],
                ...cities.map((city, index) => [city, temperatures[index]])
            ];

            setChartData(formattedData);
        };
        fetchData();
    }, [cities]);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Gráfico de Temperaturas</Typography>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={chartData}
                options={{
                    hAxis: {
                        title: 'City',
                    },
                    vAxis: {
                        title: 'Temperature (°C)',
                    },
                }}
            />
        </Box>
    );
};

export default WeatherChart;
