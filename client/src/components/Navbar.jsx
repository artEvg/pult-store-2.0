import React, { useContext } from "react"
import { assets } from "../assets/assets.js"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext.jsx"
import axios from "axios"
import "./Navbar.css"
import { toast } from "react-toastify"

const Navbar = () => {
	const navigate = useNavigate()
	const { userData, setUserData, setIsLoggedin, cartItemCount } =
		useContext(AppContext)

	const sendVerificationOtp = async () => {
		try {
			axios.defaults.withCredentials = true
			const { data } = await axios.post(
				backendUrl + "/api/auth/send-verify-otp"
			)
			if (data.success) {
				navigate("/email-verify")
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	const logout = async () => {
		try {
			axios.defaults.withCredentials = true
			const { data } = await axios.post(backendUrl + "/api/auth/logout")
			data.success && setIsLoggedin(false)
			data.success && setUserData(false)
			navigate("/")
		} catch (error) {
			toast.error(error.message)
		}
	}
	return (
		<div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
			<img
				className='w-28 sm:w-32 cursor-pointer hover:scale-110 transition-all'
				src={assets.logo}
				alt='logo image'
				onClick={() => navigate("/")}
			/>
			<div className='flex items-center gap-4'>
				{/* Иконка корзины */}
				<button
					className='relative cursor-pointer'
					onClick={() => navigate("/cart")}
					aria-label='Корзина товаров'>
					<img
						src={assets.new_cart_icon}
						alt='cart icon'
						className='w-8'
					/>
					{cartItemCount > 0 && (
						<span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex justify-center items-center'>
							{cartItemCount}
						</span>
					)}
				</button>

				{/* Иконка пользователя с выпадающим меню */}
				{userData ? (
					<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer'>
						{userData.name[0].toUpperCase()}
						<div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
							<ul className='list-none m-0 p-2 bg-gray-100 rounded-lg text-sm'>
								{!userData.isAccountVerified && (
									<li
										onClick={sendVerificationOtp}
										className='py-1 px-2 hover:bg-gray-200 cursor-pointer border-b pb-1 rounded-t-lg border-gray-400'>
										Подтвердить
									</li>
								)}
								<li
									onClick={logout}
									className='py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-b-lg pr-10'>
									Выйти
								</li>
							</ul>
						</div>
					</div>
				) : (
					<button
						onClick={() => navigate("/login")}
						className='flex items-center gap-2 border border-gray-500 rounded-full px-2 py-1 hover:bg-gray-100 transition-all cursor-pointer hover:scale-110'>
						<img
							className='w-8'
							src={assets.user_icon}
							alt='user icon'
						/>
						<img
							src={assets.arrow_icon}
							alt='arrow icon'
						/>
					</button>
				)}
			</div>
		</div>
	)
}

export default Navbar
