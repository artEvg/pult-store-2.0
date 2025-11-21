import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGODB_URI

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	price: Number,
	stock: Number,
	images: [{ url: String }],
})

const Product = mongoose.model("Product", productSchema)

const products = [
	{
		name: "Anycubic Kobra 3 Combo",
		description:
			"Anycubic Kobra 3 Combo — это современный 3D-принтер, который сочетает в себе удобство использования, высокую точность и расширенные возможности для создания качественных моделей. Эта модель предназначена как для новичков, так и для профессионалов, которые ценят скорость печати и надежность.",
		price: 75000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/oZgQ/X8hSrAMHk?mt=1763518710000",
			},
		],
	},
	{
		name: "Anycubic Photon Mono M5s Pro",
		description:
			"3D-принтер Anycubic Photon Mono M5s Pro — это профессиональное устройство для высокоточной фотополимерной 3D-печати с технологией LCD/LED. Он оснащён 10,1-дюймовым монохромным LCD-экраном с очень высоким разрешением 14K (13312 х 5120 пикселей), что обеспечивает исключительную детализацию и точность позиционирования по осям XY в пределах 16,8 х 24,8 мкм — это сопоставимо с толщиной человеческого волоса.",
		price: 105000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/YqQ3/aacNhhTFr?mt=1763518710000",
			},
		],
	},
	{
		name: "Bambu Lab P1S",
		description:
			"3D-принтер Bambu Lab P1S — это современное профессиональное устройство с закрытым корпусом, предназначенное для точной и быстрой FDM/FFF печати. Он оснащён рабочей областью 256 х 256 х 256 мм и соплом диаметром 0,4 мм, позволяющим работать с рядом материалов: PLA, ABS, PETG, TPU, PVA, полиэтилен, поликарбонат, нейлон и другие. Максимальная температура экструдера достигает 300 °C, а стола — 100 °C, что расширяет возможности для использования технических и инженерных пластиков.",
		price: 130000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Efcu/3M7D7t3Kw?mt=1763518711000",
			},
		],
	},
	{
		name: "Bambu Lab X1-Carbon Combo",
		description:
			"3D-принтер Bambu Lab X1-Carbon Combo — это высокотехнологичное профессиональное устройство FDM/FFF с закрытым корпусом и интегрированной автоматической системой подачи материалов AMS, которая позволяет загружать до 4 катушек различных пластиков одновременно. Он оснащён быстроработающим экструдером с диаметром сопла 0,4 мм и способен печатать со скоростью до 500 мм/с, что делает его одним из самых быстрых в своём классе.",
		price: 145000,
		stock: 5,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Tnd4/yk4gcAKmU?mt=1763518711000",
			},
		],
	},
	{
		name: "Creality3D K1 Max",
		description:
			"3D-принтер Creality3D K1 Max — это высокоскоростной и производительный FDM-принтер с большой рабочей областью 300 х 300 х 300 мм. Он может достигать впечатляющей скорости печати до 600 мм/с благодаря технологии быстрого движения и ускорению 20000 мм/с², что позволяет выполнять задачи значительно быстрее по сравнению с обычными моделями.",
		price: 110000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/paXo/k86yVbLHu?mt=1763518711000",
			},
		],
	},
	{
		name: "Creality3D K2 Plus",
		description:
			"3D-принтер Creality3D K2 Plus — это инновационный высокопроизводительный FDM 3D-принтер с большой областью печати 350 х 350 х 350 мм, предназначенный для многоцветной печати и работы с инженерными материалами. Принтер оснащён передовой системой цветной подачи Creality Filament System (CFS), которая поддерживает до 16 цветов без необходимости последующей окраски, что значительно расширяет возможности креативной печати.",
		price: 130000,
		stock: 8,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/cZca/j7sYoz4DC?mt=1763518711000",
			},
		],
	},
	{
		name: "Elegoo Neptune 4 Max",
		description:
			"3D-принтер Creality3D K2 Plus — это инновационный высокопроизводительный FDM 3D-принтер с большой областью печати 350 х 350 х 350 мм, предназначенный для многоцветной печати и работы с инженерными материалами. Принтер оснащён передовой системой цветной подачи Creality Filament System (CFS), которая поддерживает до 16 цветов без необходимости последующей окраски, что значительно расширяет возможности креативной печати.",
		price: 95000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/5DBH/btPqdJvdi?mt=1763518711000",
			},
		],
	},
	{
		name: "Elegoo Saturn 4",
		description:
			"3D-принтер Elegoo Saturn 4 — это передовое устройство фотополимерной 3D-печати с монохромным LCD-экраном диагональю 10 дюймов и разрешением 12K (11520 × 5120 пикселей). Он обеспечивает высокую точность позиционирования по осям XY — 19 × 24 мкм, что позволяет создавать модели с исключительной детализацией и четкостью.",
		price: 107000,
		stock: 5,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/QNGt/R5q2QX3u3?mt=1763518711000",
			},
		],
	},
	{
		name: "FlyingBear Ghost 6",
		description:
			"3D-принтер FlyingBear Ghost 6 — это компактный и надежный FDM-принтер с рабочей областью 255 x 210 x 210 мм, предназначенный для быстрого и качественного производства пластиковых изделий. Он оснащен новой конструкцией прямого экструдера с передаточным числом 1:7.5, что обеспечивает стабильную и точную подачу филамента. Принтер использует kinematics CoreXY, позволяющие достигать высокой скорости печати до 150 мм/с с низкой инерцией и минимальной вибрацией.",
		price: 80000,
		stock: 5,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/cvz8/K1CNekMRU?mt=1763518711000",
			},
		],
	},
	{
		name: "ASUS ROG Ally",
		description:
			"ASUS ROG Ally — это мощная портативная игровая консоль с Windows 11, предназначенная для запуска современных AAA-игр с высокой производительностью и удобством мобильного игрового устройства. Консоль оснащена процессором AMD Ryzen Z1 Extreme на архитектуре Zen 4 с 8 ядрами и 16 потоками и видеокартой AMD Radeon RDNA 3 с 12 вычислительными блоками, что позволяет достигать высокой частоты кадров в играх.",
		price: 78000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/kM3c/vnzCcvb6k?mt=1763518711000",
			},
		],
	},
	{
		name: "Lenovo Legion Go",
		description:
			"Lenovo Legion Go — это портативная игровая консоль с Windows 11, оснащённая мощным процессором AMD Ryzen Z1 Extreme (8 ядер, 16 потоков) с графикой Radeon RDNA, предназначенная для комфортного запуска современных игр в дороге. Консоль выделяется большим 8,8-дюймовым сенсорным IPS-дисплеем с разрешением QHD+ (2560 × 1600), частотой обновления 144 Гц и высокой яркостью до 500 нит, что обеспечивает яркую и плавную картинку.",
		price: 70000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/xHix/PxmxkVu19?mt=1763518713000",
			},
		],
	},
	{
		name: "Microsoft Xbox Series S",
		description:
			"Microsoft Xbox Series S — это компактная и доступная игровая консоль нового поколения, выпускаемая Microsoft, ориентированная на цифровой гейминг с разрешением 1440p и динамическим апскейлингом до 4K. Устройство отличается небольшими размерами, примерно на 60% меньше Xbox Series X, и подходит для любителей современных игр при ограниченном бюджете и пространстве.",
		price: 45000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Z2Vq/mRkfag6Ad?mt=1763518713000",
			},
		],
	},
	{
		name: "Microsoft Xbox Series X",
		description:
			"Microsoft Xbox Series X — это мощная игровая консоль нового поколения, выпущенная компанией Microsoft. Она предназначена для высококачественного игрового опыта с поддержкой разрешения 4K на скорости до 120 кадров в секунду и возможностью отображения видео в формате HDR до 8K.",
		price: 55000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/VJGM/bWghEWYPe?mt=1763518712000",
			},
		],
	},
	{
		name: "Nintendo Switch",
		description:
			"Nintendo Switch — это гибридная игровая консоль от компании Nintendo, которая сочетает в себе портативную и домашнюю игровые платформы. Консоль позволяет играть как на ходу с помощью встроенного экрана, так и подключаться к телевизору через док-станцию для игры на большом экране.",
		price: 45000,
		stock: 30,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/PbPB/3r4Qm9sUM?mt=1763518712000",
			},
		],
	},
	{
		name: "Nintendo Switch Lite",
		description:
			"Nintendo Switch Lite — это компактная и облегчённая версия оригинальной Nintendo Switch, предназначенная исключительно для портативного игрового опыта без возможности подключения к телевизору. Эта модель ориентирована на тех, кто предпочитает играть в дороге или везде с помощью встроенного экрана.",
		price: 35000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/hL1x/DnB83HSNU?mt=1763518713000",
			},
		],
	},
	{
		name: "PlayStation 5 Pro",
		description:
			"PlayStation 5 Pro — это усиленная версия популярной консоли PlayStation 5, представленная Sony в 2024 году, которая предлагает значительный прирост производительности и улучшения в графике и функционале.",
		price: 55000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/YUWu/YWvvN6urn?mt=1763518712000",
			},
		],
	},
	{
		name: "PlayStation 5 Slim",
		description:
			"PlayStation 5 Slim — это компактная и более энергоэффективная версия оригинальной PlayStation 5, представленная Sony в 2024 году и ориентированная на пользователей, которые хотят сохранить мощность консоли, но при этом получить уменьшенный корпус и более тихую работу.",
		price: 50000,
		stock: 40,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/qhZu/yU287H4VC?mt=1763518712000",
			},
		],
	},
	{
		name: "Steam Deck OLED",
		description:
			"Steam Deck OLED — это обновленная портативная игровая консоль от Valve, выпущенная с улучшенным OLED-дисплеем и рядом технических апгрейдов по сравнению с оригинальной Steam Deck.",
		price: 80000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/K6Kt/QUi89BDkV?mt=1763518713000",
			},
		],
	},
	{
		name: "HUION Kamvas 13",
		description:
			"HUION Kamvas 13 (Gen 3) — это портативный графический дисплей с диагональю 13,3 дюйма, предназначенный для цифрового рисования и творчества. Модель третьего поколения обладает рядом улучшений, делающих её удобной и функциональной как для начинающих художников, так и для опытных пользователей.",
		price: 55000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7UN/eG3AfHkDs?mt=1763518713000",
			},
		],
	},
	{
		name: "HUION Kamvas PRO 13",
		description:
			"HUION Kamvas Pro 13 — это профессиональный графический дисплей с диагональю 13,3 дюйма, предназначенный для художников и дизайнеров, ищущих точный и качественный инструмент для цифрового рисования.",
		price: 65000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/9bkB/35sVYjJfo?mt=1763518713000",
			},
		],
	},
	{
		name: "Parblo Coast 16 Pro",
		description:
			"Parblo Coast 16 Pro — это интерактивный графический монитор с диагональю 15,6 дюйма, предназначенный для цифрового рисования с высоким уровнем точности и комфортом работы.",
		price: 25000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/L1na/LZs79yegg?mt=1763518713000",
			},
		],
	},
	{
		name: "Parblo Coast 22 Pro",
		description:
			"Parblo Coast 22 Pro — это большой графический монитор с диагональю 21,5 дюйма, предназначенный для профессионального и любительского цифрового рисования с высокой точностью и насыщенной цветопередачей.",
		price: 45000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/yvbp/TosVZtmcv?mt=1763518713000",
			},
		],
	},
	{
		name: "VEIKK VK2200PRO",
		description:
			"VEIKK VK2200PRO — это 21,5-дюймовый графический монитор для цифрового рисования со множеством профессиональных функций.",
		price: 35000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/96eS/9Kc1DJYKY?mt=1763518713000",
			},
		],
	},
	{
		name: "Wacom Intuos Pro Medium",
		description:
			"Wacom Intuos Pro Medium (2025) — профессиональный графический планшет, предназначенный для цифрового рисования, дизайна и творчества с высокой точностью и удобством.",
		price: 30000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/7fXU/f3uiwynKB?mt=1763518713000",
			},
		],
	},
	{
		name: "Wacom One 13",
		description:
			"https://thumb.cloud.mail.ru/weblink/thumb/xw1/TUTT/62WJ8vJSd?mt=1763518713000",
		price: 25000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/TUTT/62WJ8vJSd?mt=1763518713000",
			},
		],
	},
	{
		name: "XP-Pen Artist 22R Pro",
		description:
			"XP-Pen Artist 22R Pro — это профессиональный интерактивный графический планшет с экраном размером 21,5 дюйма, предназначенный для цифрового творчества с высокой точностью и удобством.",
		price: 55000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/nBAy/Tk2PXbXdx?mt=1763518714000",
			},
		],
	},
	{
		name: "XP-Pen Artist 24 Pro",
		description:
			"XP-Pen Artist 24 Pro — это профессиональный графический планшет с экраном 23,8 дюйма с разрешением 2K QHD (2560 x 1440), предназначенный для цифровых художников и дизайнеров, которые ценят высокое качество изображения и точное управление.",
		price: 75000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/ABfR/TKYcXKPm1?mt=1763518714000",
			},
		],
	},
	{
		name: "Acer Predator X32X",
		description:
			"Acer Predator X32X — это 31,5-дюймовый изогнутый игровой монитор с разрешением 4K UHD (3840x2160) на квантово-точечном OLED-панеле, предназначенный для игр и креативной работы с высокой частотой обновления и яркой цветопередачей.",
		price: 55000,
		stock: 55,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/EcfF/YdcXNkRJK?mt=1763518714000",
			},
		],
	},
	{
		name: "Acer Predator X49X",
		description:
			"Acer Predator X49X — это большой сверхширокий игровой монитор с изогнутым 49-дюймовым QD-OLED дисплеем, предназначенный для геймеров и профессионалов, которым требуется широкое поле зрения и высокая четкость изображения.",
		price: 95000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/yHSu/ELqiX7y3v?mt=1763518714000",
			},
		],
	},
	{
		name: "ARDOR GAMING HYPERGIANT",
		description:
			"ARDOR GAMING HYPERGIANT AU42N1 — это 42-дюймовый игровой OLED монитор с разрешением 3840x2160 (4K UHD), отличающийся высокой частотой обновления и быстрой реакцией.",
		price: 35000,
		stock: 65,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/i5xT/akp8WXK82?mt=1763518714000",
			},
		],
	},
	{
		name: "ARDOR GAMING SIRIUS",
		description:
			"ARDOR GAMING SIRIUS AQ27H1O — это игровой 27-дюймовый монитор с OLED-матрицей и разрешением 2560x1440 (QHD), который обеспечивает отличный цвет и плавное изображение.",
		price: 45000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/vBz3/dCXHnU6U7?mt=1763518714000",
			},
		],
	},
	{
		name: "ASUS ROG Swift OLED PG42",
		description:
			"ARDOR GAMING HYPERGIANT AU42N1 — это 42-дюймовый игровой OLED монитор с разрешением 3840x2160 (4K UHD), отличающийся высокой частотой обновления и быстрой реакцией.",
		price: 115000,
		stock: 30,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/fJZ6/u57GyXrJ4?mt=1763518714000",
			},
		],
	},
	{
		name: "ASUS ROG Swift PG34",
		description:
			"ASUS ROG Swift PG34WCDM — это 34-дюймовый изогнутый ультраширокий OLED игровой монитор с разрешением 3440x1440 (WQHD), оптимальный для геймеров и креативных профессионалов.",
		price: 100000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/8jFF/yA6XGtita?mt=1763518714000",
			},
		],
	},
	{
		name: "MSI MPG 321CURX",
		description:
			"MSI MPG 321CURX — это 32-дюймовый изогнутый игровой монитор с QD-OLED панелью и разрешением 4K UHD (3840x2160), разработанный для скоростных игр и высокой точности изображения.",
		price: 95000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/7kri/jq6PH7Vwv?mt=1763518715000",
			},
		],
	},
	{
		name: "MSI MPG 491CQPX",
		description:
			"MSI MPG 491CQPX — это 49-дюймовый изогнутый сверхширокий игровой монитор с QD-OLED панелью и разрешением Dual QHD (5120x1440), который сочетает высокое качество изображения с очень быстрой частотой обновления.",
		price: 135000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/NTU1/7TPLQNo1L?mt=1763518714000",
			},
		],
	},
	{
		name: "Samsung Odyssey Ark G97NB",
		description:
			"Samsung Odyssey Ark G97NB — это 55-дюймовый изогнутый игровой монитор с разрешением 4K UHD (3840x2160), который сочетает в себе яркую картинку и высокую производительность.",
		price: 35000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/x9yP/38kEcFcas?mt=1763518715000",
			},
		],
	},
	{
		name: "Acer Aspire 7",
		description:
			"Acer Aspire 7 — это универсальный высокопроизводительный ноутбук, подходящий для работы, игр и творчества.",
		price: 35000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/fXyi/9ekySSy8A?mt=1763518715000",
			},
		],
	},
	{
		name: "AORUS 16 BKF",
		description:
			"AORUS 16 BKF — это мощный игровой ноутбук 2025 года от Gigabyte, ориентированный на высокопроизводительный гейминг и творческую работу.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/ndGY/cWh5Vev5x?mt=1763518715000",
			},
		],
	},
	{
		name: "AORUS 17H BXF",
		description:
			"AORUS 17H BXF — это игровой ноутбук 2023-2025 годов от Gigabyte с мощной конфигурацией, ориентированной на высокопроизводительный гейминг и профессиональные задачи.",
		price: 115000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/eJey/VTxekCThu?mt=1763518715000",
			},
		],
	},
	{
		name: "Apple MacBook Air",
		description:
			"Apple MacBook Air 2025 — это ультратонкий и легкий ноутбук с новым мощным процессором Apple M4, предназначенный для пользователей, которым нужна высокая производительность и портативность.",
		price: 95000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Ecjw/b4KSteqrM?mt=1763518715000",
			},
		],
	},
	{
		name: "Apple MacBook Pro",
		description:
			"Apple MacBook Pro 2025 — это ряд мощных профессиональных ноутбуков с экранами 14 и 16 дюймов, оснащенных новейшими чипами Apple M5, M4 Pro и M4 Max, ориентированными на максимальную производительность и энергоэффективность.",
		price: 145000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/q7F6/GyzQBfwki?mt=1763518715000",
			},
		],
	},
	{
		name: "ASUS ROG Strix G16",
		description:
			"ASUS ROG Strix G16 (2025) — это мощный игровой ноутбук с современными процессорами Intel или AMD и высокочастотным экраном, предназначенный для геймеров и пользователей, которым нужна высокая производительность.",
		price: 115000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/toK7/3ryYKvGrM?mt=1763518715000",
			},
		],
	},
	{
		name: "ASUS TUF Gaming F17",
		description:
			"ASUS TUF Gaming F17 (2025) — это игровой ноутбук с большим экраном 17,3 дюйма, подходящий для геймеров и пользователей, которым нужна мощная и портативная машина для игр и работы.",
		price: 75000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/VyYk/i6sExH3sG?mt=1763518716000",
			},
		],
	},
	{
		name: "HONOR MagicBook X16",
		description:
			"HONOR MagicBook X16 (2025) — это 16-дюймовый ноутбук с соотношением сторон 16:10, предназначенный для продуктивной работы и повседневного использования с высококачественным экраном и современной начинкой.",
		price: 45000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/P6yM/JaS2feBtb?mt=1763518716000",
			},
		],
	},
	{
		name: "Machenike L16 Pro Star",
		description:
			"Machenike L16 Pro Star — это мощный 16-дюймовый игровой ноутбук 2025 года с современными компонентами, предназначенный для игр и профессиональной работы.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/MC6V/GdambwRPC?mt=1763518716000",
			},
		],
	},
	{
		name: "Machenike L17 Pulsar 2K",
		description:
			"Machenike L17 Pulsar 2K — это современный игровой ноутбук с 17,3-дюймовым экраном высокого разрешения (2560x1440 пикселей, QHD) и частотой обновления 165 Гц, который обеспечивает четкое и плавное изображение для динамичных игр.",
		price: 95000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/rkyA/koXrDidY3?mt=1763518716000",
			},
		],
	},
	{
		name: "MSI Katana 17 B13",
		description:
			"MSI Katana 17 B13 — это 17,3-дюймовый игровой ноутбук 2025 года с современным железом, ориентированный на геймеров и требовательных пользователей.",
		price: 105000,
		stock: 30,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/kAzU/bb6SvNyTR?mt=1763518716000",
			},
		],
	},
	{
		name: "MSI Katana B12",
		description:
			"MSI Katana B12 — это серия игровых ноутбуков 2025 года с оптимальной производительностью и современным железом, ориентированных на качественный гейминг и работу.",
		price: 95000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/wJ38/4j789r9qa?mt=1763518716000",
			},
		],
	},
	{
		name: "Apple iPhone 15",
		description:
			"Apple iPhone 15 — это современный смартфон с 6,1-дюймовым OLED дисплеем Super Retina XDR с разрешением 2556x1179 и плотностью 460 ppi, оснащенный процессором Apple A16 Bionic.",
		price: 75000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/NKKB/TZNZh48Ra?mt=1763518716000",
			},
		],
	},
	{
		name: "Apple iPhone 16",
		description:
			"Apple iPhone 16 — это смартфон 2024 года с элегантным дизайном и современными технологиями, ориентированный на улучшенный пользовательский опыт и производительность.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/VUpG/AsZJTJJAd?mt=1763518716000",
			},
		],
	},
	{
		name: "Apple iPhone 16 Pro",
		description:
			"Apple iPhone 16 Pro — это флагманский смартфон Apple 2024 года с улучшенными характеристиками по сравнению с базовой моделью, ориентированный на пользователей, которым важна высокая производительность, качество камеры и премиальный дизайн.",
		price: 105000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/HgZY/vPybibHEU?mt=1763518717000",
			},
		],
	},
	{
		name: "Apple iPhone 17 Pro",
		description:
			"Apple iPhone 17 Pro был анонсирован 9 сентября 2025 года и поступил в продажу 19 сентября 2025 года. Этот флагманский смартфон выделяется улучшенным дизайном, новым процессором A19 Pro и расширенными возможностями камеры.",
		price: 135000,
		stock: 45,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/6ZZR/MV2rFKeJT?mt=1763518718000",
			},
		],
	},
	{
		name: "Apple iPhone 17 Pro Max",
		description:
			"Apple iPhone 17 Pro Max — это флагманский смартфон 2025 года с крупным 6,9-дюймовым OLED дисплеем и мощными характеристиками, обеспечивающий премиальный пользовательский опыт.",
		price: 155000,
		stock: 40,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/NrxR/QSa7vCLEE?mt=1763518717000",
			},
		],
	},
	{
		name: "Google Pixel 9",
		description:
			"Google Pixel 9 — это флагманский смартфон Google 2024 года, выпущенный в августе 2024, который сочетает продвинутые технологии искусственного интеллекта и мощную производительность.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/cAc5/3CyBvS2y8?mt=1763518717000",
			},
		],
	},
	{
		name: "Google Pixel 9 Pro XL",
		description:
			"Google Pixel 9 Pro XL — флагманский смартфон Google 2024 года с фокусом на производительность и передовые AI функции.",
		price: 125000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/KD2K/LSkmQSS7U?mt=1763518717000",
			},
		],
	},
	{
		name: "HUAWEI Mate X6",
		description:
			"Huawei Mate X6 — это флагманский складной смартфон 2024 года с современными технологиями, выпущенный в ноябре 2024 года.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/rbFT/gSmE6hysj?mt=1763518718000",
			},
		],
	},
	{
		name: "HUAWEI Pura 70 Ultra",
		description:
			"Huawei Pura 70 Ultra — это флагманский смартфон 2024 года, выделяющийся инновационной камерой и ярким большим дисплеем.",
		price: 95000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/KcRq/2s6iTqSTv?mt=1763518718000",
			},
		],
	},
	{
		name: "Samsung Galaxy S24 Ultra",
		description:
			"Samsung Galaxy S24 Ultra — это флагманский смартфон 2024 года с большим 6,8-дюймовым QHD+ дисплеем с частотой обновления 120 Гц и защитой Gorilla Glass Armor.",
		price: 85000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/EVDQ/B369d1pVB?mt=1763518718000",
			},
		],
	},
	{
		name: "Samsung Galaxy Z Fold 6",
		description:
			"Samsung Galaxy Z Fold 6 — это складной флагманский смартфон 2024 года с высокотехнологичным дизайном и мощными характеристиками.",
		price: 115000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/hceL/X2oynjhmf?mt=1763518718000",
			},
		],
	},
	{
		name: "Xiaomi 14 Ultra",
		description:
			"Xiaomi 14 Ultra — это премиальный флагманский смартфон 2024 года с передовыми технологиями в области дисплея, камеры и производительности.",
		price: 85000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Avez/msj79mMkS?mt=1763518719000",
			},
		],
	},
	{
		name: "Xiaomi Mix Flip",
		description:
			"Xiaomi Mix Flip — это складной смартфон 2024 года с инновационным дизайном и передовыми характеристиками.",
		price: 125000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/wJtL/MvhEpJFsK?mt=1763518719000",
			},
		],
	},
	{
		name: "Amazfit Balance",
		description:
			"Amazfit Balance — это умные часы с большим AMOLED-дисплеем круглой формы диагональю 1.5 дюйма и разрешением 480x480 пикселей при плотности 323 ppi. Они оснащены Bluetooth, Wi-Fi, двухчастотным GPS, NFC (опционально) и множеством датчиков, включая акселерометр, гироскоп, сенсор для биоимпедансного анализа состава тела (измерение жира, мышц, костей, воды и белка), датчик пульса, кровяного давления и уровня кислорода в крови. Часы поддерживают более 150 спортивных режимов с автоопределением и автопаузой, умеют распознавать 25 видов силовых упражнений, фиксируют важные параметры тренировок (дистанцию, пульс, каденс, калории, маршрут).",
		price: 12000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/mknf/TN7N481Xt?mt=1763518722000",
			},
		],
	},
	{
		name: "Amazfit T-Rex 3",
		description:
			"Amazfit T-Rex 3 — это прочные и надежные смарт-часы, ориентированные на активный образ жизни и экстремальные виды спорта. Они оснащены ярким 1,5-дюймовым AMOLED-дисплеем с разрешением 480x480 пикселей и яркостью до 2000 нит, что обеспечивает отличную читаемость на солнце. Корпус выдерживает экстремальные температуры от -30° до +70° и водонепроницаем до 45 метров, что делает их идеальными для использования в сложных условиях.",
		price: 15000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/UVTK/3fL61W6if?mt=1763518722000",
			},
		],
	},
	{
		name: "Apple Watch Series 10",
		description:
			"Apple Watch Series 10 — это самая тонкая и быстрая модель умных часов Apple на сегодняшний день. Оснащены 1,96-дюймовым LTPO3 OLED дисплеем с разрешением 416x496 пикселей и яркостью до 2000 нит, что улучшает читаемость на солнце. Доступны в корпусах из алюминия и титана нескольких цветов: чёрный, серебристый, розовое золото, Slate, Gold, Natural",
		price: 45000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/NYsB/ydiM4tR1L?mt=1763518723000",
			},
		],
	},
	{
		name: "Apple Watch Ultra 2",
		description:
			"Apple Watch Ultra 2 — это обновленная топовая модель умных часов от Apple, предназначенная для экстремальных условий и активного образа жизни. Часы оснащены 1,9-дюймовым плоским LTPO OLED-дисплеем с разрешением 410×502 пикселей и функцией Always On, что обеспечивает яркое и четкое изображение на солнце. Корпус выполнен из титана с сапфировым стеклом, что гарантирует прочность и защиту.",
		price: 95000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/JyZM/Ro2JFji3F?mt=1763518723000",
			},
		],
	},
	{
		name: "Garmin MARQ Athlete",
		description:
			"Garmin MARQ Athlete (Gen 2) — это премиальные спортивные умные часы, созданные для целеустремленных спортсменов. Корпус диаметром 46 мм выполнен из титана, оснащен сапфировым стеклом и ремешками из кожи и силикона. Дисплей — яркий сенсорный AMOLED.",
		price: 45000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/g5Qy/4Em333ZZ2?mt=1763518723000",
			},
		],
	},
	{
		name: "Garmin MARQ Captain",
		description:
			"Garmin MARQ Captain (Gen 2) — это премиальные умные часы, созданные для морских и водных видов спорта, а также для любителей путешествий и приключений. Корпус диаметром 46 мм изготовлен из титана с керамическим безелем и оснащён сапфировым стеклом для повышения прочности. Дисплей — цветной AMOLED с разрешением 240x240 пикселей и диагональю 1,2 дюйма.",
		price: 85000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/DmMP/5E5d2y4GR?mt=1763518723000",
			},
		],
	},
	{
		name: "HUAWEI WATCH 4 Pro",
		description:
			"HUAWEI WATCH 4 Pro — это премиальные умные часы с корпусом из авиационного титана и сферическим сапфировым стеклом, обеспечивающими высокую прочность и долговечность. Экран — 1,5-дюймовый LTPO AMOLED с разрешением 466x466 пикселей и плотностью 310 ppi, поддерживает режим Always On Display. Вес часов около 65 грамм, размеры 47.6х47.6х12.9 мм.",
		price: 45000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/aQeS/AJytnx2wS?mt=1763518723000",
			},
		],
	},
	{
		name: "HUAWEI WATCH Ultimate Steel",
		description:
			"HUAWEI WATCH Ultimate Steel — это высококлассные умные часы с премиальным дизайном и мощными характеристиками.",
		price: 30000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/eRFP/1dHRAagxB?mt=1763518723000",
			},
		],
	},
	{
		name: "Samsung Galaxy Watch Ultra",
		description:
			"Samsung Galaxy Watch Ultra (2025) — это премиальные умные часы с корпусом из титана и сапфировым стеклом, обеспечивающие высокую прочность и стильный дизайн. Они оснащены 1.5-дюймовым Super AMOLED дисплеем с разрешением 480x480 пикселей и яркостью до 2000 нит, подходящим для яркого солнечного света.",
		price: 75000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/xDMU/ot9w7KrSJ?mt=1763518724000",
			},
		],
	},
	{
		name: "Samsung Galaxy Watch6 Classic",
		description:
			"Samsung Galaxy Watch6 Classic — это стильные и функциональные смарт-часы с размером корпуса 47 мм и 43 мм, оборудованные ярким 1,5-дюймовым Super AMOLED-дисплеем с разрешением 480x480 пикселей и защитой сапфировым стеклом. Корпус выполнен из нержавеющей стали, а циферблат оснащён классическим вращающимся безелем.",
		price: 55000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/NPGk/GsYCM1SEu?mt=1763518724000",
			},
		],
	},
	{
		name: "SUUNTO RACE",
		description:
			"Suunto Race — это высокотехнологичные умные часы, предназначенные для спортсменов и активных людей, которые ценят точность данных и длительное время работы. Они оснащены ярким AMOLED-дисплеем диагональю около 1.43 дюйма с функцией Always On, а корпус выполнен из нержавеющей стали с сапфировым стеклом, что обеспечивает прочность и защиту.",
		price: 45000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/PYG6/2hZYDfSfd?mt=1763518724000",
			},
		],
	},
	{
		name: "SUUNTO VERTICAL",
		description:
			"Suunto Vertical — это продвинутые умные часы для активного отдыха и экстремальных видов спорта с акцентом на приключения на открытом воздухе. Корпус изготовлен из титана Grade 5 с сапфировым стеклом и силиконовым ремешком. Дисплей — 1.4-дюймовый цветной матричный с разрешением 280x280 пикселей с автоматической регулировкой яркости.",
		price: 35000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/djw5/DYi6kYPqe?mt=1763518724000",
			},
		],
	},
	{
		name: "Apple iPad Air (M2)",
		description:
			"Apple iPad Air (M2) — это высокопроизводительный планшет с процессором Apple M2, имеющим 8-ядерный CPU (4 производительных и 4 энергоэффективных ядра) и 9-ядерный GPU, что обеспечивает впечатляющую скорость и графическую мощь. Планшет оснащен 11-дюймовым Liquid Retina дисплеем с разрешением 2360x1640 пикселей, поддержкой широкой цветовой гаммы P3, технологией True Tone, антибликовым покрытием и яркостью до 500 нит.",
		price: 65000,
		stock: 35,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/axdd/BD4eQgJoh?mt=1763518725000",
			},
		],
	},
	{
		name: "Apple iPad Pro (M4)",
		description:
			"Apple iPad Pro (M4) — это планшетный компьютер премиум-класса с процессором Apple M4, который включает до 10 ядер CPU (4 производительных и 6 энергоэффективных) и 10 ядер GPU с поддержкой аппаратного ускорения трассировки лучей. Планшет имеет 11-дюймовый экран с технологией Ultra Retina XDR на основе Tandem OLED с разрешением 2420x1668 пикселей и частотой обновления до 120 Гц (ProMotion), поддерживает широкий цвет P3, True Tone, антибликовое покрытие и опцию nano-texture для моделей с высокой памятью.",
		price: 95000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/bugD/4yGcx3U12?mt=1763518725000",
			},
		],
	},
	{
		name: "HONOR MagicPad 2",
		description:
			"HONOR MagicPad 2 — это продвинутый планшет с 12.3-дюймовым OLED дисплеем, поддерживающим 1 миллиард цветов, разрешением 1920x3000 пикселей, 144 Гц частотой обновления и яркостью до 1600 нит с поддержкой HDR10. Планшет работает на чипсете Qualcomm Snapdragon 8s Gen 3 (4 нм), с восьмиядерным процессором (1x3.0 ГГц Cortex-X4, 4x2.8 ГГц Cortex-A720, 3x2.0 ГГц Cortex-A520) и графическим ускорителем Adreno 735.",
		price: 55000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/eknQ/Auc6CfiM5?mt=1763518725000",
			},
		],
	},
	{
		name: "HONOR MagicPad 2 12.3",
		description:
			"HONOR MagicPad 2 12.3 — планшет с 12.3-дюймовым OLED-дисплеем, разрешением 3000x1920 пикселей, плотностью 290 ppi и частотой обновления до 144 Гц с адаптивной подстройкой (60-144 Гц). Максимальная яркость достигает 1600 нит, поддерживается HDR10 и широкий цветовой охват DCI-P3 (98.4%). Экран защищён закалённым стеклом.",
		price: 75000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/96r1/zbPszDiEN?mt=1763518725000",
			},
		],
	},
	{
		name: "HUAWEI MatePad Pro (2024)",
		description:
			"HUAWEI MatePad Pro (2024) — это премиальный планшет с 13.2-дюймовым OLED-дисплеем с разрешением 2880x1920 пикселей и частотой обновления 144 Гц, что обеспечивает яркое и плавное изображение. Корпус выполнен из магниевого сплава с задней крышкой из нейлона и стекла, вес составляет около 580 грамм, толщина 5.5 мм.",
		price: 50000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/ZVi3/QrPUqSDGb?mt=1763518726000",
			},
		],
	},
	{
		name: "HUAWEI MatePad Pro PaperMatte",
		description:
			"HUAWEI MatePad Pro PaperMatte — это версия планшета с 12,2-дюймовым экраном Tandem OLED с технологией PaperMatte, которая сочетает антибликовые свойства и защиту зрения, создавая эффект текстуры как у бумаги, что очень удобно для письма и рисования стилусом. Разрешение дисплея составляет 2800 × 1840 пикселей с плотностью около 274 ppi, частотой обновления 144 Гц, яркостью до 2000 нит и контрастностью около 2 000 000:1.",
		price: 60000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/257E/YkRSXV9Xs?mt=1763518726000",
			},
		],
	},
	{
		name: "Lenovo Legion Y900",
		description:
			"Lenovo Legion Y900 — это мощный планшет с большим 14.5-дюймовым OLED-дисплеем, разрешением 1876x3000 пикселей (соотношение сторон 14.4:9), частотой обновления 120 Гц и поддержкой HDR10+ и Dolby Vision, что гарантирует яркое и плавное изображение. Экран сертифицирован TÜV Rheinland, что подтверждает комфорт для глаз.",
		price: 70000,
		stock: 30,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/3jYL/XeKjFVfdg?mt=1763518726000",
			},
		],
	},

	{
		name: "Lenovo P11 Pro",
		description:
			"Lenovo Tab P11 Pro — это мощный планшет с 11.5-дюймовым OLED-дисплеем с разрешением 2560x1600 пикселей и поддержкой HDR10, обеспечивающим качественное и яркое изображение. Планшет оснащён процессором Qualcomm Snapdragon 730G с восьмиядерным CPU и графикой Adreno 618, что подходит для мультимедийных задач и игр.",
		price: 75000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/rcrE/23brXXvn6?mt=1763518726000",
			},
		],
	},
	{
		name: "Samsung Galaxy Tab S10 Ultra",
		description:
			"Samsung Galaxy Tab S10 Ultra (2024) — это флагманский планшет с огромным 14.6-дюймовым Dynamic AMOLED 2X дисплеем с разрешением 1848x2960 пикселей, частотой обновления 120 Гц и поддержкой HDR10+. Экран защищён стеклом с твёрдостью по шкале Мооса 5.",
		price: 85000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jrm1/XU7fmdHS7?mt=1763518726000",
			},
		],
	},
	{
		name: "Samsung Galaxy Tab S10+",
		description:
			"Samsung Galaxy Tab S10+ (2024) — это мощный и стильный планшет с 12.4-дюймовым Dynamic AMOLED 2X дисплеем с разрешением 1752x2800 пикселей, частотой обновления 120 Гц и поддержкой HDR10+, что обеспечивает яркое и плавное изображение. Защищен стеклом с уровнем твердости 5 по шкале Мооса.",
		price: 80000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/TxVo/21UR3SxUY?mt=1763518726000",
			},
		],
	},
	{
		name: "Xiaomi Pad 6S Pro",
		description:
			"Xiaomi Pad 6S Pro — это 12.4-дюймовый планшет с IPS LCD экраном разрешением 3048x2032 пикселей (3K), поддержкой Dolby Vision, HDR10 и частотой обновления 144 Гц с адаптивным синхронизированием. Яркость достигает 900 нит, а цветовой охват — DCI-P3.",
		price: 65000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/m8sG/8DDV6feNr?mt=1763518726000",
			},
		],
	},
	{
		name: "Xiaomi Redmi Pad Pro",
		description:
			"Xiaomi Redmi Pad Pro (2024) — это планшет с 12.1-дюймовым IPS LCD экраном разрешением 2560x1600 пикселей, поддержкой Dolby Vision, HDR10 и частотой обновления 120 Гц. Экран защищён стеклом Gorilla Glass 3.",
		price: 75000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/1N3w/F2pMD4QiW?mt=1763518726000",
			},
		],
	},
	{
		name: "Haier 65 Smart TV S6",
		description:
			"Haier 65 Smart TV S6 — это 65-дюймовый телевизор с технологией HQLED и разрешением 4K UHD (3840x2160 пикселей), обеспечивающий яркое и насыщенное изображение. Частота обновления экрана достигает 144 Гц, что обеспечивает плавность динамичных сцен.",
		price: 55000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/JdDS/YD1iQpsPG?mt=1763518727000",
			},
		],
	},
	{
		name: "Haier 75 Smart TV S3",
		description:
			"Haier 75 Smart TV S3 — это 75-дюймовый телевизор с HQLED-экраном и разрешением 4K UHD (3840x2160 пикселей), обеспечивающим яркое и детализированное изображение. Он поддерживает технологии улучшения картинки HDR10, Dolby Vision и 4K Upscaling, что улучшает качество видео даже с низким исходным разрешением.",
		price: 65000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/eNPX/Emi8Xy6Zx?mt=1763518727000",
			},
		],
	},
	{
		name: "Hisense 55A85K",
		description:
			"Hisense 55A85K — это 55-дюймовый OLED телевизор с разрешением 4K UHD (3840x2160 пикселей) и частотой обновления 120 Гц. Дисплей обеспечивает идеальную контрастность благодаря технологии OLED и имеет максимальную яркость до 900 нит, поддерживает HDR10, Dolby Vision и HLG.",
		price: 50000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/J5SW/Awy1j2XeB?mt=1763518727000",
			},
		],
	},
	{
		name: "Hisense 85E7NQ",
		description:
			"isense 85E7NQ — это QLED телевизор с диагональю 85 дюймов (215 см) и разрешением 4K UHD (3840x2160 пикселей). Экран с технологией Direct-LED, тип панели VA, частота обновления 60 Гц, уровень яркости до 400 нит, контрастность около 6000:1, время отклика 8 мс, углы обзора 178° по горизонтали и вертикали. Поддерживаются HDR стандарты HDR10, HDR10+, Dolby Vision IQ и HLG, а также локальное затемнение.",
		price: 65000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/GfUc/CgxtNXbtv?mt=1763518727000",
			},
		],
	},
	{
		name: "LG 75QNED",
		description:
			"LG 75QNED (2025) — это 75-дюймовый QNED MiniLED 4K UHD телевизор с разрешением 3840x2160 пикселей и частотой обновления 120 Гц, обеспечивающий яркое и контрастное изображение благодаря технологии Quantum Dot + NanoCell и точному управлению подсветкой Full Array Local Dimming Pro. В основе лежит процессор α8 AI Processor 4K Gen2 с поддержкой AI Super Upscaling.",
		price: 245000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/wou2/zC8ch4Q2u?mt=1763518727000",
			},
		],
	},
	{
		name: "LG OLED48",
		description:
			"LG OLED48 (2025) — это 48-дюймовый OLED телевизор с разрешением 4K UHD (3840x2160 пикселей), оснащенный процессором α9 AI Processor Gen 2, который обеспечивает улучшенную картинку и звук с помощью искусственного интеллекта. Дисплей OLED evo обеспечивает идеальные черные цвета, 100% точность цветопередачи и высокую яркость благодаря технологии Brightness Booster.",
		price: 155000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/ScaR/LF8sRkhng?mt=1763518727000",
			},
		],
	},
	{
		name: "Samsung UE65",
		description:
			"Samsung UE65 (2025) — это 65-дюймовый LED телевизор с разрешением 4K UHD (3840x2160), оснащённый процессором Crystal Processor 4K и поддержкой HDR10+. Телевизор предлагает чёткое и яркое изображение с технологией Mega Contrast и UHD Dimming для повышения контрастности. Частота обновления экрана составляет 50 Гц с технологией Motion Xcelerator.",
		price: 135000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/aybF/rEMWPaE4y?mt=1763518727000",
			},
		],
	},
	{
		name: "Samsung UE75",
		description:
			"Samsung UE75 (2025) — это 75-дюймовый LED телевизор с разрешением 4K UHD (3840x2160 пикселей), оснащённый процессором Crystal Processor 4K, который улучшает качество изображения с помощью интеллектуального апскейлинга и улучшения четкости. Телевизор поддерживает HDR10+ для яркости и контраста, а технология Mega Contrast улучшает детализацию в темных и светлых участках.",
		price: 155000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/UB5R/nQtjT2Vms?mt=1763518727000",
			},
		],
	},
	{
		name: "TCL 65C755",
		description:
			"TCL 65C755 — это 65-дюймовый QD-Mini LED 4K телевизор с разрешением 3840x2160 пикселей. Экран VA с технологией MiniLED имеет около 500 зон локальной подсветки, максимальную яркость 1300 нит и контрастность 6000:1. Частота обновления экрана достигает 144 Гц с поддержкой VRR, что обеспечивает плавное изображение и удобен для гейминга.",
		price: 85000,
		stock: 10,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/oZGC/NkCLaZSj2?mt=1763518728000",
			},
		],
	},
	{
		name: "TCL 75С755",
		description:
			"TCL 75C755 — это 75-дюймовый QD-Mini LED телевизор с разрешением 4K Ultra HD (3840x2160 пикселей), оснащённый 1344 зонами локального затемнения для точной настройки контрастности. Экран VA с частотой обновления 144 Гц и яркостью до 1600 нит обеспечивает яркое и четкое изображение с улучшенной цветопередачей (до 93% DCI-P3).",
		price: 105000,
		stock: 15,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/JzvN/iYsgZoGs3?mt=1763518727000",
			},
		],
	},
	{
		name: "Xiaomi TV A Pro 75",
		description:
			"Xiaomi TV A Pro 75 (2025) — это 75-дюймовый QLED телевизор с разрешением 4K UHD (3840x2160 пикселей) и цветовым охватом DCI-P3 92%, обеспечивающий реалистичную и насыщенную картинку с глубиной цвета 1.07 миллиарда оттенков. Экран выполнен на панели VA с частотой обновления 60 Гц и углами обзора 178° по горизонтали и вертикали.",
		price: 85000,
		stock: 20,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/5FUV/zr2ZYp23P?mt=1763518727000",
			},
		],
	},
	{
		name: "Xiaomi TV Max 86",
		description:
			"Xiaomi TV Max 86 (2025) — это огромный 86-дюймовый LED телевизор с разрешением 4K UHD (3840x2160 пикселей) и частотой обновления 120 Гц с поддержкой технологии MEMC для плавного отображения динамичных сцен. Экран VA покрывает около 90% цветового пространства DCI-P3 и отображает 1.07 миллиарда цветов, обеспечивая яркую и насыщенную картинку с широкими углами обзора 178°.",
		price: 105000,
		stock: 25,
		images: [
			{
				url: "https://thumb.cloud.mail.ru/weblink/thumb/xw1/5dDR/hHDnab78u?mt=1763518728000",
			},
		],
	},
]

async function seedDB() {
	try {
		await mongoose.connect(MONGO_URI, { dbName: "mern-auth" })
		console.log("Connected to MongoDB")

		await Product.deleteMany({})
		console.log("Old products removed")

		const inserted = await Product.insertMany(products)
		console.log(`${inserted.length} products added`)

		await mongoose.disconnect()
		console.log("Disconnected from MongoDB")
	} catch (error) {
		console.error("Error seeding database:", error)
	}
}

seedDB()
