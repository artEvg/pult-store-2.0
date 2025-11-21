import React from "react"

const StatCard = ({ icon, title, value, color = "blue" }) => {
	const colorGradients = {
		blue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		pink: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		cyan: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
	}

	return (
		<div
			style={{
				background: colorGradients[color],
				color: "white",
				padding: "25px",
				borderRadius: "12px",
				display: "flex",
				alignItems: "center",
				gap: "20px",
				boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
				transition: "transform 0.3s ease, box-shadow 0.3s ease",
				cursor: "pointer",
			}}
			onMouseEnter={e => {
				e.currentTarget.style.transform = "translateY(-5px)"
				e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
			}}
			onMouseLeave={e => {
				e.currentTarget.style.transform = "translateY(0)"
				e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)"
			}}>
			<div style={{ fontSize: "40px" }}>{icon}</div>
			<div>
				<h3 style={{ fontSize: "14px", opacity: 0.9, marginBottom: "8px" }}>
					{title}
				</h3>
				<p style={{ fontSize: "28px", fontWeight: 700, margin: 0 }}>{value}</p>
			</div>
		</div>
	)
}

export default StatCard
