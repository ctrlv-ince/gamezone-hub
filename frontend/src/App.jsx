import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <HomePage />
      </Container>
      <Footer />
    </>
  );
}

export default App;
