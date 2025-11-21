import jwt from "jsonwebtoken"
import User from "../models/User.js"

const userAuth = async (req, res, next) => {
	try {
		// Получение токена из заголовка или cookie
		const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Токен не найден" })
		}

		// Верификация токена
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		// Получение пользователя по ID из токена
		const user = await User.findById(decoded.id)

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Пользователь не найден" })
		}

		// Добавляем данные пользователя в req.user
		req.user = user
		req.userId = decoded.id // или req.user.id
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
