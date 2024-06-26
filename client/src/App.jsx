import { useState } from 'react';
import './App.css';
import TransactionsTable from './components/TransactionTable';
import TransactionsStatistics from './components/TransactionStatistics';
import TransactionBarChart from './components/TransactionBarChart';
import {Container, Typography} from '@mui/material'

function App() {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };
    return (
      <Container>
        <Typography variant='h4' sx={{textAlign: 'center', fontFamily: 'Playwrite NZ, cursive'}}>Transactions Dashboard</Typography>
        <select value={selectedMonth} onChange={handleMonthChange}>
        {/* Options for month selection */}
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <TransactionsTable selectedMonth={selectedMonth} />
      <TransactionsStatistics selectedMonth={selectedMonth} />
      <TransactionBarChart selectedMonth={selectedMonth}  />
      {/* <TransactionsPieChart month={month} /> */}
    </Container>
  );
}

export default App;
