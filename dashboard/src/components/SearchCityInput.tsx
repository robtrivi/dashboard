import React from 'react';
import { TextField,Button, Grid } from '@mui/material';

interface SearchCityInputProps {
    cityInput: string;
    setCityInput: React.Dispatch<React.SetStateAction<string>>;
    handleSearchCity: () => void;
}

const SearchCityInput: React.FC<SearchCityInputProps> = ({ cityInput, setCityInput, handleSearchCity }) => {
    return (
        <Grid container direction="column" spacing={1}>

        <Grid item xs={12}>
            <TextField
                label="Buscar ciudad"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
        </Grid>
        <Grid item>
        <Button variant="contained" onClick={handleSearchCity} fullWidth>Buscar</Button>
    </Grid>
        </Grid>
    );
};

export default SearchCityInput;
