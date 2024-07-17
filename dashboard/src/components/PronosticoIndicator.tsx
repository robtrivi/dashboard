import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

type WeatherIcon = '01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d';

interface WeatherConditions {
  temperature: number;
  condition: string;
}

interface PronosticoIndicatorProps {
  date: string;
  historicalType: 'temperature' | 'humidity' | 'precipitation';
  condition: string;
  index: number;
  forecastData: any; // Puedes ajustar el tipo según la estructura de tus datos
}

const obtenerIconoOpenWeather = (condition: string): WeatherIcon => {
  if (condition.includes('snow')) {
    return '13d'; // Nieve
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    return '10d'; // Lluvia
  } else if (condition.includes('thunderstorm')) {
    return '11d'; // Tormenta
  } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
    return '50d'; // Neblina
  } else if (condition.includes('clear')) {
    return '01d'; // Despejado
  } else if (condition.includes('clouds')) {
    return '03d'; // Nubes dispersas
  } else {
    return '01d'; // Despejado por defecto
  }
};

const getValue = (index: number, historicalType: string, forecastData: any) => {
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


const PronosticoIndicator: React.FC<PronosticoIndicatorProps> = ({ date, historicalType, condition, index, forecastData }) => {
  const value = getValue(index, historicalType, forecastData);
  const icon = obtenerIconoOpenWeather(condition);
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', backgroundColor: '#80C1FF' }}>
      <Typography variant="subtitle1">{date}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={iconUrl} alt="Icono del clima" style={{ fontSize: 40, color: 'white' }} />
        <Typography variant="h6" sx={{ color: 'white' }}>{historicalType.charAt(0).toUpperCase() + historicalType.slice(1)}</Typography>
        <Typography variant="h4" sx={{ color: 'white' }}>{value}</Typography>
      </Box>
    </Paper>
  );
};

export default PronosticoIndicator;
