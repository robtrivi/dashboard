import React from 'react';
import CitySelector from './components/CitySelector';
import { Container } from '@mui/material';

const App: React.FC = () => (
    <Container maxWidth="lg">
        <CitySelector />
    </Container>
);

export default App;
