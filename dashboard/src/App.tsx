import React from 'react';
import CitySelector from './components/CitySelector';
import { Container, Typography } from '@mui/material';


const App: React.FC = () => (
  <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
  <CitySelector />
</Container>
);

export default App;
