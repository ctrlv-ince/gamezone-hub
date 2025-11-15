import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
