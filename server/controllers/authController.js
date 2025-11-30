import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "./../models/User.js"
import transporter from "../config/nodemailer.js"
import {
	EMAIL_VERIFY_TEMPLATE,
	PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js"

// Регистрация
export const register = async (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		return res.json({ success: false, message: "Пропущены поля" })
	}
	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.json({
				success: false,
				message: "Пользователь уже существует",
			})
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = new User({ name, email, password: hashedPassword })
		await user.save()
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		})
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		// Отправка приветственного письма
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: "Добро Пожаловать в mern-auth",
			text: `Добро Пожаловать в mern-auth. Ваш аккаунт создан с id: ${user._id}`,
		}
		await transporter.sendMail(mailOptions)
		return res.json({ success: true, token })
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}

// Авторизация
export const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.json({
			success: false,
			message: "Почта или пароль не допустимы",
		})
	}
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.json({ success: false, message: "Не удалось проверить почту" })
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.json({
				success: false,
				message: "Неверный пароль",
			})
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		})
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		return res.json({ success: true, token })
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}

// Выход их профиля
export const logout = async (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		})
		return res.json({ success: true, message: "Вы вышли из аккаунта" })
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}

// Отправка подтверждения профиля
export const sendVerifyOtp = async (req, res) => {
	try {
		const userId = req.userId

		// ✅ Проверка userId
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Не авторизован. Сначала войдите в аккаунт",
			})
		}

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "Пользователь не найден",
			})
		}

		if (user.isAccountVerified) {
			return res.json({
				success: false,
				message: "Аккаунт уже подтверждён",
			})
		}

		// ✅ Генерация OTP
		const otp = String(Math.floor(100000 + Math.random() * 900000))
		user.verifyOtp = otp
		user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000 // 24 часа
		await user.save()

		console.log(`🔍 OTP ${otp} отправлен пользователю ${user.email}`)

		// ✅ Отправка email с обработкой ошибок
		const mailOption = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: "Подтверждение аккаунта",
			html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
				"{{email}}",
				user.email
			),
		}

		await transporter.sendMail(mailOption)

		return res.json({
			success: true,
			message: "Код подтверждения отправлен на вашу почту",
		})
	} catch (error) {
		console.error("❌ sendVerifyOtp error:", error)
		return res.status(500).json({
			success: false,
			message: "Ошибка сервера при отправке кода",
		})
	}
}

export const verifyEmail = async (req, res) => {
	try {
		const { otp } = req.body

		// ✅ Валидация OTP
		if (!otp || otp.length !== 6) {
			return res.status(400).json({
				success: false,
				message: "Неверный формат кода подтверждения",
			})
		}

		// ✅ Поиск пользователя по OTP
		const user = await User.findOne({
			verifyOtp: otp,
			verifyOtpExpireAt: { $gt: Date.now() },
		})

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Неверный или истёкший код подтверждения",
			})
		}

		// ✅ Подтверждение аккаунта
		user.isAccountVerified = true
		user.verifyOtp = undefined
		user.verifyOtpExpireAt = undefined
		await user.save()

		console.log(`✅ Аккаунт ${user.email} подтверждён`)

		return res.json({
			success: true,
			message: "Аккаунт подтверждён успешно!",
		})
	} catch (error) {
		console.error("❌ verifyEmail error:", error)
		return res.status(500).json({
			success: false,
			message: "Ошибка сервера при подтверждении",
		})
	}
}

// Проверка авторизации
export const isAuthenticated = async (req, res) => {
	try {
		return res.json({ success: true })
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}

// Отправка сброса пароля
export const sendResetOtp = async (req, res) => {
	const { email } = req.body
	if (!email) {
		return res.json({ success: false, message: "Требуется электронная почта" })
	}
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.json({
				success: false,
				message: "Пользователь не найден",
			})
		}
		const otp = String(Math.floor(100000 + Math.random() * 900000))
		user.resetOtp = otp
		user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000
		await user.save()

		const mailOption = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: "Сброс пароля",
			html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
				"{{email}}",
				user.email
			),
		}
		await transporter.sendMail(mailOption)
		return res.json({
			success: true,
			message: "Код для сброса пароля отправлен на вашу почту",
		})
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}

// Сброс пароля
export const resetPassword = async (req, res) => {
	const { email, otp, newPassword } = req.body
	if (!email || !otp || !newPassword) {
		return res.json({
			success: false,
			message: "Требуется электронная почта, otp, новый пароль",
		})
	}
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.json({
				success: false,
				message: "Пользователь не найден",
			})
		}
		if (!user.resetOtp || user.resetOtp !== otp) {
			return res.json({ success: false, message: "Неверный код подтверждения" })
		}

		if (user.resetOtpExpireAt < Date.now()) {
			return res.json({ success: false, message: "Код подтверждения истёк" })
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10)
		user.password = hashedPassword
		user.resetOtp = ""
		user.resetOtpExpireAt = 0
		await user.save()

		return res.json({ success: true, message: "Пароль обновлен" })
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}
