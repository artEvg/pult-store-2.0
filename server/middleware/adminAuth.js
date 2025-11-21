import ErrorHandler from "../utils/errorHandler.js"

export const isAdmin = (req, res, next) => {
	try {
		if (req.user.role !== "admin") {
			return next(
				new ErrorHandler(
					"Только администраторы имеют доступ к этому ресурсу",
					403
				)
			)
		}
		next()
	} catch (error) {
		return next(new ErrorHandler(error.message, 500))
	}
}

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Роль ${req.user.role} не может получить доступ к этому ресурсу`,
					403
				)
			)
		}
		next()
	}
}
