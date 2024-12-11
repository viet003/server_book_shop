import express from "express"
require('dotenv').config()
import { ConnectCRDB, ConnectMSQL } from "./src/config"
import cors from "cors"
import initRoutes from "./src/routes" // khởi tạo tất cả các route

// khởi tạo app
const app = express()

app.use(cors(
    {
        origin: "*",
        methods: ["POST", 'GET', 'PUT', "DELETE"]
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
ConnectCRDB()

const port = process.env.PORT || 2025
const listener = app.listen(port, () => {
    console.log(`Server is running on ${listener.address().port}.....`)
})