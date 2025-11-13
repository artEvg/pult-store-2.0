import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	cartItems: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: "Product",
				required: true,
			},
			name: String,
			price: Number,
			image: String,
			stock: Number,
			quantity: {
				type: Number,
				default: 1,
				required: true,
			},
		},
	],
	totalPrice: {
		type: Number,
		default: 0,
	},
	totalQuantity: {
		type: Number,
		default: 0,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const Cart = mongoose.models.cart || mongoose.model("Cart", cartSchema)

export default Cart
