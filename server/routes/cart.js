import express from "express"
import {
	updateCartItem,
	addToCart,
	getCart,
	removeFromCart,
	clearCart,
} from "../controllers/cartController.js"
import { isAuthenticatedUser } from "../middleware/auth.js"

export const cartRoutes = express.Router()

cartRoutes.route("/").get(isAuthenticatedUser, getCart)
cartRoutes.route("/add").post(isAuthenticatedUser, addToCart)
cartRoutes.route("/update").post(isAuthenticatedUser, updateCartItem)
cartRoutes.route("/remove").post(isAuthenticatedUser, removeFromCart)
cartRoutes.route("/clear").post(isAuthenticatedUser, clearCart)
