import React from "react"
import Navbar from "../components/Navbar"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./AboutUs.css"

const AboutUs = () => {
	const media = [
		{
			type: "image",
			src: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/6Cd9/QTAZW3rnw?mt=1763557976000",
		},
		{
			type: "image",
			src: "https://media.gettyimages.com/id/1170952996/photo/shipping-shopping-online-laptop-computer-at-workplace-of-start-up.jpg?s=612x612&w=0&k=20&c=PMNImYrooT5O0x0RtykD8bqXGa7lFa9C7hWTf1GdfdE=",
		},
		{
			type: "video",
			src: "/videos/coverr-christmas-shopping-5931-1080p.mp4",
			poster: "https://thumb.cloud.mail.ru/weblink/thumb/vxw0/3ivq/8VkWwewbF",
		},
	]

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 700,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true,
	}

	return (
		<>
			<Navbar />
			<div className='about-container'>
				<h1 className='about-title'>О нашей компании</h1>
				<p className='about-description'>
					Мы — команда профессионалов с опытом более 10 лет в области
					электроники и IT. Мы стремимся предоставить нашим клиентам
					исключительно качественные и надежные товары. Нас отличает
					индивидуальный подход и внимательное отношение к вашим потребностям.
				</p>
				<p className='about-description'>
					Наша миссия — сделать технологичные решения доступными для каждого,
					обеспечивая комфорт и эффективность в повседневной жизни.
				</p>

				<section className='slider-section'>
					<h2 className='subtitle'>Наши медиа материалы</h2>
					<Slider {...sliderSettings}>
						{media.map((item, index) => (
							<div key={index}>
								{item.type === "image" ? (
									<img
										src={item.src}
										alt={`Медиа ${index + 1}`}
										className='slider-image'
									/>
								) : (
									<video
										controls
										src={item.src}
										poster={item.poster}
										className='slider-image'
									/>
								)}
							</div>
						))}
					</Slider>
				</section>
			</div>
		</>
	)
}

export default AboutUs
