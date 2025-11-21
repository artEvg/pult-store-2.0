import React from "react"
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import Navbar from "../components/Navbar"
import "./ContactUs.css"

const ContactUs = () => {
	const mapState = {
		center: [43.115536, 131.885485],
		zoom: 12,
	}

	return (
		<>
			<Navbar />
			<div className='contact-container'>
				<h1 className='contact-title'>Обратная связь</h1>
				<div className='contact-content'>
					<div className='contact-map'>
						<YMaps query={{ apikey: "525f2edb-7b96-4977-badb-f58e94a02a8a" }}>
							<Map
								defaultState={mapState}
								width='100%'
								height='400px'>
								<Placemark geometry={mapState.center} />
							</Map>
						</YMaps>
					</div>
					<div className='contact-info'>
						<h2>Информация о компании</h2>
						<table>
							<tbody>
								<tr>
									<td>Название:</td>
									<td>ООО "Ваш Магазин"</td>
								</tr>
								<tr>
									<td>Адрес:</td>
									<td>г. Владивосток, ул. Примерная, 25</td>
								</tr>
								<tr>
									<td>Телефон:</td>
									<td>+7 (423) 123-45-67</td>
								</tr>
								<tr>
									<td>Email:</td>
									<td>support@example.com</td>
								</tr>
								<tr>
									<td>Время работы:</td>
									<td>Пн-Пт с 9:00 до 18:00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default ContactUs
