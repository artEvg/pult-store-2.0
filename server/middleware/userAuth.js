import jwt from "jsonwebtoken"
import User from "../models/User.js"

const userAuth = async (req, res, next) => {
	try {

		const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Токен не найден" })
		}


		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findById(decoded.id)

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Пользователь не найден" })
		}


		req.user = user
		req.userId = decoded.id
		next()
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Ошибка авторизации",
			error: error.message,
		})
	}
}
export default userAuth
