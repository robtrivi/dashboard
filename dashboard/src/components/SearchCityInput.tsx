import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface SearchCityInputProps {
    cityInput: string;
    setCityInput: React.Dispatch<React.SetStateAction<string>>;
    handleSearchCity: () => void;
}

const SearchCityInput: React.FC<SearchCityInputProps> = ({ cityInput, setCityInput, handleSearchCity }) => {
    return (
        <Grid container direction="row" spacing={1} alignItems="stretch">
            <Grid item xs={12} lg={6}>
                <TextField
                    label="Buscar ciudad"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    fullWidth
                    sx={{ mb: { lg: 0, xs: 2 } }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Button
                    variant="contained"
                    onClick={handleSearchCity}
                    fullWidth
                    sx={{ height: '100%' }}
                >
                    Buscar
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchCityInput;
