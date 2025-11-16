import React, { useState } from 'react';
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

  const handleFilter = async () => {
    try {
      const data = await getSalesData(startDate, endDate);
      const formattedData = data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        totalSales: item.totalSales,
      }));
      setSalesData(formattedData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div>
      <h2>Sales Chart</h2>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      {salesData && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;