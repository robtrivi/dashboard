import React, { useState, useEffect } from 'react';
import { fetchCoordinates, fetchHistoricalWeatherData } from '../api/api';
import { Box, Typography, Paper } from '@mui/material';
import { Chart } from 'react-google-charts';

interface WeatherChartProps {
    city: string;
    historicalType: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city, historicalType }) => {
    const [chartData, setChartData] = useState<any>([['Date', 'Value']]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { lat, lon } = await fetchCoordinates(city);
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(endDate.getDate() - 6);

                const formattedEndDate = endDate.toISOString().split('T')[0];
                const formattedStartDate = startDate.toISOString().split('T')[0];

                const historicalData = await fetchHistoricalWeatherData(lat, lon, formattedStartDate, formattedEndDate, historicalType);

                if (!historicalData.daily) {
                    throw new Error('No daily data available');
                }

                const dataKey = `${historicalType}_2m_max`; // Adjusted key based on API
                const formattedData = [
                    ['Date', 'Value'],
                    ...historicalData.daily[dataKey].map((value: number, i: number) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        return [date.toLocaleDateString(), value];
                    }),
                ];

                if (formattedData.length > 1) {
                    setChartData(formattedData);
                    setError(null);
                } else {
                    setError('No data available for the selected city.');
                }
            } catch (error) {
                setError(`Error fetching historical weather data: ${error.message}`);
                console.error('Error fetching historical weather data:', error);
            }
        };
        fetchData();
    }, [city, historicalType]);

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Gráfico de {historicalType.charAt(0).toUpperCase() + historicalType.slice(1)} - Última Semana
            </Typography>
            {error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : (
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={chartData}
                    options={{
                        hAxis: {
                            title: 'Date',
                        },
                        vAxis: {
                            title: `${historicalType.charAt(0).toUpperCase() + historicalType.slice(1)} (°C)`,
                        },
                        legend: { position: 'none' },
                    }}
                />
            )}
        </Paper>
    );
};

export default WeatherChart;
