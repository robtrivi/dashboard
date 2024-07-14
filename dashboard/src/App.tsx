import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CitySelector from './components/CitySelector';

const App: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Weather Dashboard
                </Typography>
                <CitySelector />
            </Container>
        </Box>
    );
};

export default App;
