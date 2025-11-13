import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGODB_URI

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	price: Number,
	stock: Number,
	images: [{ url: String }],
})

const Product = mongoose.model("Product", productSchema)

const products = [
	{
		name: "Кофемашина DeLonghi",
		description: "Автоматическая кофемашина с капучинатором",
		price: 25000,
		stock: 10,
		images: [{ url: "https://example.com/images/delonghi1.jpg" }],
	},
	{
		name: "Смартфон Samsung Galaxy S21",
		description: "Мощный смартфон с камерой 108 МП",
		price: 55000,
		stock: 15,
		images: [{ url: "https://example.com/images/samsung_s21.jpg" }],
	},
	{
		name: "Ноутбук Apple MacBook Pro",
		description: "Ноутбук с процессором M1 и Retina дисплеем",
		price: 130000,
		stock: 5,
		images: [{ url: "https://example.com/images/macbookpro.jpg" }],
	},
]

async function seedDB() {
	try {
		await mongoose.connect(MONGO_URI, { dbName: "mern-auth" })
		console.log("Connected to MongoDB")

		await Product.deleteMany({})
		console.log("Old products removed")

		const inserted = await Product.insertMany(products)
		console.log(`${inserted.length} products added`)

		await mongoose.disconnect()
		console.log("Disconnected from MongoDB")
	} catch (error) {
		console.error("Error seeding database:", error)
	}
}

seedDB()
