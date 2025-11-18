import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import { getMonthlySalesData } from '../../services/adminService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MonthlySalesChart = () => {
  const [salesData, setSalesData] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || userLoading) return;
      setLoading(true);
      try {
        const data = await getMonthlySalesData();
        const formattedData = data.map((item) => {
          return {
            month: item.month,
            totalSales: item.totalSales,
          };
        });
        setSalesData(formattedData);
        const total = formattedData.reduce((acc, item) => acc + item.totalSales, 0);
        setTotalSales(total);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, userLoading]);

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload && payload.payload) {
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
            {payload.payload.month}
          </Typography>
          <Typography sx={{ color: '#00d4ff', fontWeight: 600, fontSize: '1rem' }}>
            ${payload.value.toFixed(2)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
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
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Total Sales
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              ₱{totalSales.toFixed(2)}
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(139, 0, 255, 0.2)"
              />
              <XAxis 
                dataKey="month" 
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
              <Bar 
                dataKey="totalSales" 
                fill="#8b00ff"
                name="Total Sales (₱)"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : salesData && salesData.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            No sales data found
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Loading...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MonthlySalesChart;