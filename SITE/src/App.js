import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Welcome from './components/Welcome'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Components from './components/Components'

// const url = new URL(document.URL)
// console.log(url.pathname)
console.log('© Дмитрий Щербаков. Все права защищены.')
console.log(
	'\tУважаемый разработчик. \n\tДанная программа предназначена исключительно для поддержки деятельности тренеров и спортсменов. Любые несанкционированные изменения могут негативно повлиять на работу системы. Просьба пользоваться исключительно предусмотренным интерфейсом пользователя. \n\tСпасибо за понимание и сотрудничество!\n\tС уважением, \nАдминистрация платформы! ',
) // console it

function NoSEO() {
	const location = useLocation()

	useEffect(() => {
		const exMeta = document.querySelector('meta[name="robots"]')
		if (exMeta) {
			exMeta.remove()
		}

		if (location.pathname !== '/') {
			if (!/\d/.test(location.pathname)) {
				const meta = document.createElement('meta')
				meta.name = 'robots'
				meta.content = 'noindex, nofollow'
				document.head.appendChild(meta)
			}
		}
	}, [location.pathname])

	return null
}

function App() {
	const [lenguageRU, setlenguageRU] = useState(false)
	const set = () => setlenguageRU((i) => !i)

	const adText = lenguageRU
		? 'For your marketing. Email: swim.sport@mail.ru'
		: 'Место для вашей рекламы. Email: swim.sport@mail.ru'

	return (
		<div className="App">
			<div className="ad-banner">
				<div className="ad-banner-content">
					<a href="mailto:swim.sport@mail.ru" className="ad-link">
						{adText}
					</a>
				</div>
			</div>
			<button className="lang-toggle-btn" onClick={set}>
				{!!lenguageRU ? 'RU' : 'EN'}
			</button>
			<BrowserRouter>
				<div>
					<NoSEO />
					<Routes>
						<Route path="/" element={<Welcome enru={lenguageRU} />} />
						<Route path="/:id" element={<Components enru={lenguageRU} />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</div>
			</BrowserRouter>
			<footer className="app-footer">
				<hr />
				{!lenguageRU
					? '© Дмитрий Щербаков. Все права защищены.'
					: '© Dmitry Shcherbakov. Copyright. All rights reserved.'}
			</footer>
		</div>
	)
}
export default App
