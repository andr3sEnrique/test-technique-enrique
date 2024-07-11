import React from 'react';
import ProdutsList from './ProductsList';
import NavbarComponent from './NavbarComponent';
import { Container } from '@mui/material';

function Index() {
  return (
    <Container>
      <NavbarComponent />
      <ProdutsList />
    </Container>
  );
}

export default Index;
