import React from 'react';
import { Grid, MenuItem, Button, Select } from '@mui/material';
import SearchCityInput from './SearchCityInput';

interface CitySelectorProps {
    cityInput: string;
    setCityInput: React.Dispatch<React.SetStateAction<string>>;
    handleSearchCity: () => void;
    historicalType: string;
    setHistoricalType: React.Dispatch<React.SetStateAction<string>>;
}

const CitySelector: React.FC<CitySelectorProps> = ({
    cityInput,
    setCityInput,
    handleSearchCity,
    historicalType,
    setHistoricalType,
}) => {
    return (
        <Grid container direction="column">
    <Grid item>
        <SearchCityInput
            cityInput={cityInput}
            setCityInput={setCityInput}
        />
    </Grid>
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
