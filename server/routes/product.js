import express from "express"
import {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
} from "../controllers/productController.js"
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js"

export const productRoutes = express.Router()

productRoutes.route("/products").get(getAllProducts)
productRoutes.route("/product/:id").get(getProductDetails)

productRoutes
	.route("/admin/product/new")
	.post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
productRoutes
	.route("/admin/product/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
