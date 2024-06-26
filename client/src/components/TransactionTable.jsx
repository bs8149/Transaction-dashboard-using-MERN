// src/components/TransactionsTable.js

import React, { useState } from "react";
import { useGetAllTransactionsQuery } from "../redux/productApi.js";
import { Box, Button } from "@mui/material";

const TransactionsTable = ({ selectedMonth }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useGetAllTransactionsQuery(selectedMonth);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Apply search filter
  const filteredTransactions =
    data.transactions && Array.isArray(data.transactions)
      ? data.transactions.filter(
          (transaction) =>
            transaction.title
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            transaction.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            transaction.price
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
      : [];

  // Apply pagination
  const perPage = 10;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + perPage
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Transactions Table</h2>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search transactions..."
        />
      </Box>

      <table>
        <thead>
          <tr>
            <th style={{ width: "50px" }}>ID</th>
            <th style={{ width: "200px" }}>Title</th>
            <th style={{ width: "800px" }}>Description</th>
            <th style={{ width: "150px" }}>Price</th>
            <th style={{ width: "250px" }}>Category</th>
            <th style={{ width: "150px" }}>Sold</th>
            <th style={{ width: "150px" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "True" : "False"}</td>
              <td>
                <img src={transaction.image} alt="" width={"50px"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{ margin: "5px" }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage * perPage >= filteredTransactions.length}
          sx={{ margin: "5px" }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
