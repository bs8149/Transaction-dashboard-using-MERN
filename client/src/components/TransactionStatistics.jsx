// src/components/TransactionsStatistics.js

import React from 'react';
import { useGetStatisticsQuery } from '../redux/productApi';
import { Box, Grid } from '@mui/material';

const TransactionsStatistics = ({ selectedMonth }) => {
  const { data } = useGetStatisticsQuery(selectedMonth);
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

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2>Transactions Statistics - {months(selectedMonth)}</h2>
      <Box sx={{border: '1px solid black', borderRadius: '10px', display: 'inline-block', width: '500px', background: 'rgb(240, 164, 0)'}}>
        <Grid container sx={{textAlign: 'center'}}>
            <Grid item xs={6}>
                <p>Total Sale Amount: </p>
                <p>Total Sold Items: </p>
                <p>Total Not Sold Items: </p>
            </Grid>
            <Grid item xs={6}>
            <p>${data.totalSaleAmount}</p>
        <p>{data.totalSoldItems}</p>
        <p>{data.totalNotSoldItems}</p>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TransactionsStatistics;
