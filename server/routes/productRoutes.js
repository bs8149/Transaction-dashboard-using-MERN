import express from 'express'
import { allTransactions, barChart, combinedData, databaseSeeding, pieChart, statistics } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get('/db', databaseSeeding)
productRouter.get('/all-transactions', allTransactions)
productRouter.get('/statistics', statistics)
productRouter.get('/bar-chart', barChart)
productRouter.get('/pie-chart', pieChart)
productRouter.get('/all-data', combinedData)

export default productRouter