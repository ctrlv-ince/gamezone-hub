import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Paper
} from '@mui/material';
import { getSalesData } from '../../services/adminService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      return;
    }
    
    setLoading(true);
    try {
      const data = await getSalesData(startDate, endDate);
      const formattedData = data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        totalSales: item.totalSales,
      }));
      setSalesData(formattedData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            background: 'rgba(26, 31, 58, 0.95)',
            border: '1px solid rgba(139, 0, 255, 0.3)',
            borderRadius: 1
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '0.875rem', mb: 0.5 }}>
            {payload[0].payload.date}
          </Typography>
          <Typography sx={{ color: '#00d4ff', fontWeight: 600, fontSize: '1rem' }}>
            ${payload[0].value.toFixed(2)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Date Filter Controls */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 2, 
        mb: 4,
        alignItems: 'flex-end'
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' }, minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            Start Date
          </Typography>
          <TextField
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '& fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8b00ff',
                  boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
                '&::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                }
              }
            }}
          />
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' }, minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            End Date
          </Typography>
          <TextField
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '& fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8b00ff',
                  boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
                '&::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                }
              }
            }}
          />
        </Box>

        <Button
          onClick={handleFilter}
          disabled={!startDate || !endDate || loading}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%)',
            color: 'white',
            px: 4,
            py: 1.5,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            minWidth: 120,
            '&:hover': {
              boxShadow: '0 0 20px rgba(139, 0, 255, 0.5)',
              transform: 'translateY(-2px)'
            },
            '&:disabled': {
              background: 'rgba(139, 0, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? 'Loading...' : 'Filter'}
        </Button>
      </Box>

      {/* Chart Display */}
      {salesData && salesData.length > 0 ? (
        <Box 
          sx={{ 
            mt: 4,
            p: 3,
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
            border: '1px solid rgba(139, 0, 255, 0.2)'
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(139, 0, 255, 0.2)"
              />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255, 255, 255, 0.6)"
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.6)"
                style={{ fontSize: '0.875rem' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  color: 'white',
                  paddingTop: '20px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="totalSales" 
                stroke="#8b00ff"
                strokeWidth={3}
                dot={{ fill: '#00d4ff', r: 5 }}
                activeDot={{ r: 7, fill: '#00d4ff' }}
                name="Total Sales (₱)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : salesData && salesData.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            No sales data found for the selected date range
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Select a date range to view sales data
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SalesChart;