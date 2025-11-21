import User from "../models/User.js"

export const getUserDate = async (req, res) => {
	try {
		const userId = req.userId
		const user = await User.findById(userId)
		if (!user) {
			return res.json({
				success: false,
				message: `Пользователь не найден - ${userId}`,
			})
		}
		res.json({
			success: true,
			userData: {
				name: user.name,
				role: user.role,
				isAccountVerified: user.isAccountVerified,
				id: user._id,
			},
		})
	} catch (error) {
		return res.json({ success: false, message: error.message })
	}
}
