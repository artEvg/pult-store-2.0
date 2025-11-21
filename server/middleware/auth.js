import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const isAuthenticatedUser = async (req, res, next) => {
	const token =
		req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Вы не авторизованы" })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.id)
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Пользователь не найден" })
		}
		req.user = user // Записываем полный объект пользователя
		console.log("User authenticated with role:", user.role) // Логирование для отладки
		next()
	} catch (error) {
		return res
			.status(401)
			.json({ success: false, message: "Неверный или истекший токен" })
	}
}

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		console.log("AuthorizeRoles: user role =", req.user.role) // Логирование
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				success: false,
				message: `Роль ${req.user.role} не имеет доступа`,
			})
		}
		next()
	}
}
