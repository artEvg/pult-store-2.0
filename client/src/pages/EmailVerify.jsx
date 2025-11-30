import React, { useContext, useEffect, useRef } from "react"
import { assets } from "../assets/assets"
import { toast } from "react-toastify"
import axios from "axios"
import { AppContext } from "../context/AppContext.jsx"
import { useNavigate } from "react-router-dom"
const backendUrl = "http://localhost:4000"

const EmailVerify = () => {
	const { isLoggedin, userData, getUserData } = useContext(AppContext)
	const navigate = useNavigate()
	const inputRefs = useRef([])
	axios.defaults.withCredentials = true
	const handleInput = (e, index) => {
		if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
			inputRefs.current[index + 1].focus()
		}
	}
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && e.target.value === "" && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}
	const handlePaste = e => {
		e.preventDefault()
		const paste = e.clipboardData.getData("text").slice(0, 6)
		const pasteArray = paste.split("")
		pasteArray.forEach((char, idx) => {
			if (inputRefs.current[idx]) {
				inputRefs.current[idx].value = char
			}
		})

		const lastIndex = 5
		if (inputRefs.current[lastIndex]) {
			inputRefs.current[lastIndex].focus()
			inputRefs.current[lastIndex].select()
		}
	}
	const onSubmitHandler = async e => {
		try {
			e.preventDefault()
			const otpArray = inputRefs.current.map(e => e.value)
			const otp = otpArray.join("")
			const { data } = await axios.post(
				backendUrl + "/api/auth/verify-account",
				{ otp },
				{ withCredentials: true }
			)
			if (data.success) {
				toast.success(data.message)
				getUserData()
				navigate("/")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		isLoggedin && userData && userData.isAccountVerified && navigate("/")
	}, [isLoggedin, userData])

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
			<img
				className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-110 transition-all'
				onClick={() => navigate("/")}
				src={assets.logo}
				alt='logo image'
			/>
			<form
				onSubmit={onSubmitHandler}
				className='bg-slate-900 p-8 rounded-lg shadow-lg w-120 text-sm'>
				<h1 className='text-white text-2xl font-semibold text-center mb-4'>
					Подтверждение Аккаунта
				</h1>
				<p className='text-center mb-6 text-indigo-300'>
					Введите 6-значный код отправленный на вашу почту.
				</p>
				<div
					className='flex justify-between mb-8'
					onPaste={handlePaste}>
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<input
								type='text'
								className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
								maxLength='1'
								ref={e => (inputRefs.current[index] = e)}
								onKeyDown={e => handleKeyDown(e, index)}
								onInput={e => handleInput(e, index)}
								key={index}
								required
							/>
						))}
				</div>
				<button
					className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold rounded-full transition-all hover:scale-105 cursor-pointer'
					type='submit'>
					Подтвердить Аккаунт
				</button>
			</form>
		</div>
	)
}

export default EmailVerify
