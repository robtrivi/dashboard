import React from 'react';
import { TextField, Grid } from '@mui/material';

interface SearchCityInputProps {
    cityInput: string;
    setCityInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchCityInput: React.FC<SearchCityInputProps> = ({ cityInput, setCityInput}) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="Buscar ciudad"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
        </Grid>
    );
};

export default SearchCityInput;
