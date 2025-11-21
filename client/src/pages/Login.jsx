import React, { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext.jsx"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
	const navigate = useNavigate()
	const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)
	const [state, setState] = useState("Sign Up")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const onSubmitHandler = async e => {
		try {
			e.preventDefault()
			axios.defaults.withCredentials = true
			if (state === "Sign Up") {
				const { data } = await axios.post(backendUrl + "/api/auth/register", {
					name,
					email,
					password,
				})
				if (data.success) {
					localStorage.setItem("token", data.token)
					setIsLoggedin(true)
					getUserData()
					navigate("/")
				} else {
					toast.error(data.message)
				}
			} else {
				const { data } = await axios.post(backendUrl + "/api/auth/login", {
					email,
					password,
				})
				if (data.success) {
					localStorage.setItem("token", data.token)
					setIsLoggedin(true)
					getUserData()
					navigate("/")
				} else {
					toast.error(data.message)
				}
			}
		} catch (error) {
			toast.error(error.message)
		}
	}
	return (
		<div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
			<img
				className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-110 transition-all'
				onClick={() => navigate("/")}
				src={assets.logo}
				alt='logo image'
			/>
			<div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
				<h2 className='text-3xl font-semibold text-white text-center mb-3'>
					{state === "Sign Up" ? "Создайте Аккаунт" : "Вход"}
				</h2>
				<p className='text-center text-sm mb-6'>
					{state === "Sign Up" ? "Создайте ваш Аккаунт" : "Войдите в Аккаунт"}
				</p>
				<form onSubmit={onSubmitHandler}>
					{state === "Sign Up" && (
						<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
							<img
								src={assets.person_icon}
								alt='user icon'
							/>
							<input
								type='text'
								placeholder='Ваше Имя'
								className='bg-transparent outline-none w-full text-white'
								onChange={e => setName(e.target.value)}
								value={name}
								required
							/>
						</div>
					)}

					<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
						<img
							src={assets.mail_icon}
							alt='mail icon'
						/>
						<input
							type='email'
							placeholder='Ваша Почта'
							className='bg-transparent outline-none w-full text-white'
							onChange={e => setEmail(e.target.value)}
							value={email}
							required
						/>
					</div>
					<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
						<img
							src={assets.lock_icon}
							alt='password icon'
						/>
						<input
							type='password'
							placeholder='Ваш Пароль'
							className='bg-transparent outline-none w-full text-white'
							onChange={e => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>
					<p
						onClick={() => navigate("/reset-password")}
						className='mb-4 text-indigo-500 cursor-pointer'>
						Забыли Пароль?
					</p>
					<button
						type='submit'
						className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:scale-105 transition-all'>
						{state === "Sign Up" ? "Создайте ваш Аккаунт" : "Войдите в Аккаунт"}
					</button>
				</form>
				{state === "Sign Up" ? (
					<p className='text-gray-400 text-center text-sm mt-4'>
						Уже есть Аккаунт?{" "}
						<span
							onClick={() => setState("Login")}
							className='text-blue-400 cursor-pointer underline'>
							Вход
						</span>
					</p>
				) : (
					<p className='text-gray-400 text-center text-sm mt-4'>
						Нет Аккаунта?{" "}
						<span
							onClick={() => setState("Sign Up")}
							className='text-blue-400 cursor-pointer underline'>
							Регистрация
						</span>
					</p>
				)}
			</div>
		</div>
	)
}

export default Login
