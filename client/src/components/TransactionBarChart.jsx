// src/components/TransactionsBarChart.js

import React from 'react';
import { useGetBarChartQuery } from '../redux/productApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { Box } from '@mui/material';

const TransactionBarChart = ({ selectedMonth }) => {
  const { data, error, isLoading } = useGetBarChartQuery(selectedMonth);
  const months = (selectedMonth) => {
    switch(selectedMonth){
        case 1: return 'January'
        case 2: return 'Febuary'
        case 3: return 'March'
        case 4: return 'April'
        case 5: return 'May'
        case 6: return 'June'
        case 7: return 'July'
        case 8: return 'August'
        case 9: return 'September'
        case 10: return 'October'
        case 11: return 'November'
        case 12: return 'December'            
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <h2 style={{textAlign: 'center'}}>Transactions Bar Chart - {months(selectedMonth)}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionBarChart;
