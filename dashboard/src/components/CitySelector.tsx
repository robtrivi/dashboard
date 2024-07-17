import React from 'react';
import { Grid, MenuItem, Button, Select } from '@mui/material';

interface CitySelectorProps {
    handleSearchCity: () => void;
    historicalType: string;
    setHistoricalType: React.Dispatch<React.SetStateAction<string>>;
}

const CitySelector: React.FC<CitySelectorProps> = ({
    handleSearchCity,
    historicalType,
    setHistoricalType,
}) => {
    return (
        <Grid container direction="column" spacing={1}>
    
    <Grid item>
        <Select
            value={historicalType}
            onChange={(e) => setHistoricalType(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 4 }}
        >
            <MenuItem value="temperature">Temperatura</MenuItem>
            <MenuItem value="humidity">Humedad</MenuItem>
            <MenuItem value="precipitation">Precipitación</MenuItem>
        </Select>
    </Grid>
    <Grid item>
        <Button variant="contained" onClick={handleSearchCity} fullWidth>Buscar</Button>
    </Grid>
</Grid>
    );
};

export default CitySelector;
