import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import SalesChart from '../../components/admin/SalesChart';

const AdminDashboardPage = () => {

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
      py: 6
    }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{
          mb: 6,
          pb: 4,
          borderBottom: '1px solid rgba(139, 0, 255, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              width: '6px',
              height: '50px',
              background: 'linear-gradient(to bottom, #8b00ff, #00d4ff)',
              mr: 3,
              borderRadius: '3px',
              boxShadow: '0 0 20px rgba(139, 0, 255, 0.5)'
            }} />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '1px'
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              ml: { xs: 0, md: 5 }
            }}
          >
            Monitor your store performance and analytics
          </Typography>
        </Box>

        {/* Navigation Section */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/admin/products"
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #8b00ff, #00d4ff)',
              color: 'white',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(139, 0, 255, 0.5)',
              '&:hover': {
                background: 'linear-gradient(to right, #a133ff, #33e0ff)',
                boxShadow: '0 0 30px rgba(139, 0, 255, 0.8)'
              }
            }}
          >
            Manage Products
          </Button>
        </Box>

        {/* Sales Chart Section */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(139, 0, 255, 0.2)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ 
              mb: 3,
              pb: 2,
              borderBottom: '1px solid rgba(139, 0, 255, 0.2)'
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  mb: 0.5
                }}
              >
                Sales Analytics
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                Track your sales performance over time
              </Typography>
            </Box>
            <SalesChart />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminDashboardPage;