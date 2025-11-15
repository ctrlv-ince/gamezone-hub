import React from 'react';
import { Container, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetailsPage from './pages/ProductDetailsPage';
import UploadPage from './pages/UploadPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
