import React from "react"

const ConfirmDialog = ({
	title,
	message,
	onConfirm,
	onCancel,
	isLoading = false,
}) => {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 3000,
			}}>
			<div
				style={{
					background: "white",
					borderRadius: "12px",
					padding: "30px",
					maxWidth: "400px",
					width: "90%",
					boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
				}}>
				<h2 style={{ marginBottom: "15px", color: "#2d3748" }}>{title}</h2>
				<p style={{ color: "#718096", marginBottom: "30px" }}>{message}</p>
				<div
					style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
					<button
						onClick={onCancel}
						disabled={isLoading}
						style={{
							padding: "10px 20px",
							background: "#e2e8f0",
							color: "#2d3748",
							border: "none",
							borderRadius: "6px",
							cursor: isLoading ? "not-allowed" : "pointer",
							fontWeight: 600,
						}}>
						Отмена
					</button>
					<button
						onClick={onConfirm}
						disabled={isLoading}
						style={{
							padding: "10px 20px",
							background: "#fc8181",
							color: "white",
							border: "none",
							borderRadius: "6px",
							cursor: isLoading ? "not-allowed" : "pointer",
							fontWeight: 600,
						}}>
						{isLoading ? "Удаление..." : "Удалить"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDialog
