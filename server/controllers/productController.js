import axios from "axios";
import productModel from "../models/productModel.js";

export const databaseSeeding = async (req, res) => {
  try {
    const apiUrl =
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const response = await axios.get(apiUrl);
    const data = response.data;
    await productModel.deleteMany();
    await productModel.insertMany(
      data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        sold: item.sold,
        dateOfSale: new Date(item.dateOfSale),
        month: new Date(item.dateOfSale).getMonth() + 1,
      }))
    );

    res
      .status(201)
      .json({ message: "Database initialized and seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;

  const query = {
    month: { $eq: month },
  };

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { price: search },
    ];
  }

  try {
    const transactions = await productModel
      .find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .sort({ month: "desc" });

    const count = await productModel.countDocuments(query);

    res.status(200).json({ transactions, count, page, perPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const statistics = async (req, res) => {
  const { month } = req.query;

  try {
    const totalSaleItems = await productModel.find({ month: month, sold: true });

    let totalSaleAmount = 0;
    totalSaleItems.forEach(item => {
      totalSaleAmount += item.price;
    });
    const totalSoldItems = await productModel.countDocuments({
      month: { $eq: month },
      sold: true,
    });
    const totalNotSoldItems = await productModel.countDocuments({
      month: { $eq: month },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};

export const barChart = async (req, res) => {
    const { month } = req.query;

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const results = await Promise.all(priceRanges.map(async (range) => {
            const count = await productModel.countDocuments({
                month: { $eq: month},
                price: { $gte: range.min, $lt: range.max }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
}

export const pieChart = async (req, res) => {
    const { month } = req.query;

    try {
        const categories = await productModel.aggregate([
            {
                $match: {
                    month: { $eq: month }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1
                }
            }
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
};

export const combinedData = async (req, res) => {
    const { month } = req.query;

    try {
        const baseUrl = 'http://localhost:5000';

        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
          axios.get(`${baseUrl}/statistics`, { params: { month } }),
          axios.get(`${baseUrl}/bar-chart`, { params: { month } }),
          axios.get(`${baseUrl}/pie-chart`, { params: { month } })
        ]);
    
        const combinedResponse = {
          statistics: statisticsResponse.data,
          barChart: barChartResponse.data,
          pieChart: pieChartResponse.data
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error("Error fetching combined data:", error);
        res.status(500).json({ error: 'Failed to fetch combined data' });
    }
};