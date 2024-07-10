import React from 'react';
import ProdutsList from './components/ProductsList';
import NavbarComponent from './components/NavbarComponent';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <NavbarComponent />
      <ProdutsList />
    </Container>
  );
}

export default App;
