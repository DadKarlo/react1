import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Home from './Home'
import Guest from './Guest'
import { API_site } from '../API_URL'

export default function Components(props) {
	const [www, setWww] = useState(null)
	const [sse, setSse] = useState(true)
	const [showuser, setShowShowuser] = useState(true)
	const setShowuser = () => setShowShowuser((i) => !i)
	const params = useParams()
	const web = params.id

	useEffect(() => {
		fetch(API_site + `/${web}`, { method: 'POST' })
			.then((res) => res.text())
			.then((data) => {
				setWww(data)
			})
			.catch((err) => console.log(err))
	}, [web])

	// console.log(www, 'www')

	const guest = window.location.origin

	return (
		<div style={{ fontFamily: 'Arial' }}>
			{www === '' ? (
				(window.location.href = '/')
			) : !isNaN(web) ? (
				<>
					<h6
						style={{
							position: 'absolute',
							right: 0,
							fontFamily: 'Arial',
						}}
					>
						{!!sse ? (
							<>{!!props.enru ? '🟢 Online' : '🟢Подключено'}</>
						) : (
							<>{!!props.enru ? '❌ Offline' : '❌ Нет сети'}</>
						)}
					</h6>
					<Guest www={www} web={web} sse={setSse} enru={props.enru} />
				</>
			) : (
				<>
					<h4
						style={{
							position: 'absolute',
							left: 0,
							whiteSpace: 'pre',
							overflow: 'hidden',
						}}
					>
						<button
							style={{
								left: 0,
								fontFamily: 'Arial',
								border: '1px',
								backgroundColor: 'white',
							}}
							type="button"
							onClick={setShowuser}
						>
							{!!props.enru ? 'User:' : 'Пользователь:'}
						</button>{' '}
						{showuser ? '***' : `${web}`}
					</h4>
					<h6
						style={{ position: 'absolute', right: 0, backgroundColor: 'white' }}
					>
						{!!sse ? (
							<>{!!props.enru ? '🟢 Online' : '🟢Подключено'}</>
						) : (
							<>{!!props.enru ? '❌ Offline' : '❌ Нет сети'}</>
						)}
					</h6>
					<br />
					<h6>
						{!!props.enru
							? 'Save your Login and URL in a safe place!!!'
							: 'Храните путь к ресурсу в недоступном для 3-x лиц месте!'}
					</h6>
					<h5>
						{!!props.enru
							? 'For the guests URL: '
							: 'Гостевая ссылка для зрителей: '}

						<a href={guest + '/' + JSON.parse(www)?.setup?.URLCLIENT}>
							{guest + '/' + JSON.parse(www)?.setup?.URLCLIENT}
						</a>
					</h5>
					<br />
					<Home www={www} web={web} sse={setSse} enru={props.enru} />
				</>
			)}
		</div>
	)
}
