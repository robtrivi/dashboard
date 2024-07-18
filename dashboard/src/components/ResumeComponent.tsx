import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import clearSky from '../assets/conditions/clear_sky.jpg';
import fewClouds from '../assets/conditions/few_clouds.jpg';
import scatteredClouds from '../assets/conditions/scattered_clouds.jpg';
import brokenClouds from '../assets/conditions/broken_clouds.jpg';
import rain from '../assets/conditions/rain.jpg';

interface ResumeComponentProps {
  city: string;
  country: string;
  condition: string;
  icon: string;
}

const ResumeComponent: React.FC<ResumeComponentProps> = ({ city, country, condition, icon }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const getImageUrl = (condition: string): string => {
    const conditionImages: { [key: string]: string } = {
      'clear sky': clearSky,
      'few clouds': fewClouds,
      'scattered clouds': scatteredClouds,
      'broken clouds': brokenClouds,
      'rain':rain,
    };
    return conditionImages[condition] || brokenClouds;
  };

  const imageUrl = getImageUrl(condition);
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item lg={6} xs={12} id="izquierda" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
          <Grid container sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {city} ({country})
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{formattedTime}</Typography>
            </Grid>
            <Grid item xs={12}>
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={imageUrl} alt={condition} style={{ width: '100%', height: '100%', maxHeight:'230px', objectFit: 'cover', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResumeComponent;
