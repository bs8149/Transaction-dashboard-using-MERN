import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}` }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (month) => ({
        url: '/all-transactions',
        params: { month },
      }),
    }),
    getStatistics: builder.query({
      query: (month) => ({
        url: '/statistics',
        params: { month },
      }),
    }),
    getBarChart: builder.query({
      query: (month) => ({
        url: '/bar-chart',
        params: { month },
      }),
    }),
    getPieChart: builder.query({
      query: (month) => ({
        url: '/pie-chart',
        params: { month },
      }),
    }),
    getCombinedData: builder.query({
      query: (month) => ({
        url: '/all-data',
        params: { month },
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetStatisticsQuery,
  useGetBarChartQuery,
  useGetPieChartQuery,
  useGetCombinedDataQuery,
} = productApi;
