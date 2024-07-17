import React, { useState, useEffect } from 'react';
import { fetchCoordinates, fetchHistoricalWeatherData } from '../api/api';
import { Typography, Paper } from '@mui/material';
import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area, ResponsiveContainer} from 'recharts';

interface WeatherChartProps {
    city: string;
    historicalType: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city, historicalType }) => {
    const [chartData, setChartData] = useState<any[]>([]);
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
                    throw new Error('No hay datos disponibles');
                }

                const dataKey = {
                    temperature: 'temperature_2m_max',
                    humidity: 'relative_humidity_2m_max',
                    precipitation: 'precipitation_sum',
                }[historicalType];

                if (dataKey !== undefined) {
                    if (!historicalData.daily[dataKey]) {
                        throw new Error(`No data available for ${dataKey}`);
                    }

                    const formattedData = historicalData.daily[dataKey].map((value: number, i: number) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        return { date: date.toLocaleDateString(), value };
                    }).reverse();

                    if (formattedData.length > 0) {
                        setChartData(formattedData);
                        setError(null);
                    } else {
                        setError('No hay datos disponibles para esta ciudad.');
                    }
                }

            } catch (error) {
                setError(`Error en el fetch: ${(error as Error).message}`);
                console.error('Error al hacer fetch:', error);
            }
        };
        fetchData();
    }, [city, historicalType]);

    const getTooltipLabel = (type: string) => {
        switch (type) {
            case 'temperature':
                return 'Temperatura';
            case 'humidity':
                return 'Humedad';
            case 'precipitation':
                return 'Precipitación';
            default:
                return 'Valor';
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 2,
                padding: 2,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                }}
            >
                Última semana
            </Typography>
            {error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`${value}`, getTooltipLabel(historicalType)]} />
                        <Area type="monotone" dataKey="value" stroke="#1976d2" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Paper>
    );
};

export default WeatherChart;
