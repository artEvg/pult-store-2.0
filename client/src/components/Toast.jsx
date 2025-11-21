// components/Toast.jsx - Компонент для уведомлений
import React, { useEffect } from "react"

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)
		return () => clearTimeout(timer)
	}, [duration, onClose])

	const typeStyles = {
		success: {
			background: "#c6f6d5",
			color: "#22543d",
			borderLeft: "4px solid #22543d",
		},
		error: {
			background: "#fed7d7",
			color: "#742a2a",
			borderLeft: "4px solid #742a2a",
		},
		warning: {
			background: "#feebc8",
			color: "#7c2d12",
			borderLeft: "4px solid #7c2d12",
		},
		info: {
			background: "#bee3f8",
			color: "#2c5282",
			borderLeft: "4px solid #2c5282",
		},
	}

	return (
		<div
			style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				padding: "16px 20px",
				borderRadius: "8px",
				...typeStyles[type],
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
				animation: "slideIn 0.3s ease",
				zIndex: 3001,
			}}>
			{message}
		</div>
	)
}

export default Toast
