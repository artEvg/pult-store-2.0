import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { productRoutes } from "./routes/product.js"
import { cartRoutes } from "./routes/cart.js"
import orderRoutes from "./routes/order.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 4000
connectDB()

const allowedOrigins = ["http://localhost:5173"]

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

// API Пути
app.get("/", (req, res) => res.send("API Работает"))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

app.use(express.static(path.join(__dirname, "client/build")))

app.get(/.*/, (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})


app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))
