import jwt from "jsonwebtoken"

// Middleware для проверки авторизации пользователя
export const isAuthenticatedUser = (req, res, next) => {
	const token =
		req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Вы не авторизованы. Пожалуйста, войдите в аккаунт снова",
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		return res.status(401).json({
			success: false,
			message:
				"Неверный или истекший токен. Пожалуйста, войдите в аккаунт снова",
		})
	}
}

// Middleware для авторизации по ролям (например, admin)
export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Вы не авторизованы",
			})
		}

		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				success: false,
				message: `Роль ${req.user.role} не имеет доступа к этому ресурсу`,
			})
		}

		next()
	}
}
