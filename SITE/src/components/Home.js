import { useEffect, useState } from 'react'
import '../App.css'
import FormSetup from './FormSetup'
import FormUser from './UserForm'
import PositionDistance from './PositionDistance'
import ShowUserStart from './ShowUserStart'
import ShowUserFinish from './ShowUserFinish'
import { API_site } from '../API_URL'
//p {!!props.enru ? 'EN' : 'RU'}

function Home(props) {
	const [data, setDate] = useState([]) //ferst render
	//const [sse, setSse] = useState(true)

	useEffect(() => {
		if (data?.setup?.NameTitle) {
			if (data?.setup?.NameTitle !== ''.trim()) {
				document.title = `${data?.setup?.NameTitle}`
			}
		} else {
			document.title = 'Соревнования по плаванию | Competitive Swimming'
		}
	}, [data])

	useEffect(() => {
		//!!!
		const user = new URL(document.URL)
		const sse = new EventSource(API_site + `${user.pathname}`) //!!!SSE variant
		sse.onopen = () => {
			// console.log('onopen')
			props.sse(true)
		}
		sse.onmessage = async (e) => {
			const data = await JSON.parse(e.data)
			// console.log(data, 'sse')
			setDate(data)
		}
		sse.onerror = (err) => {
			props.sse(false)
			// console.log(err)
		}
		return () => {
			sse.close()
			props.sse(false)
			// console.log('close')
		}
	}, []) //!!!SSE

	const [formSetup, setFormSetup] = useState(true)
	const setformSetup = () => setFormSetup((i) => !i)
	const [formUser, setFormUser] = useState(true)
	const setformUser = () => setFormUser((i) => !i)
	const [positionDistance, setPositionDistance] = useState(true)
	const setpositionDistance = () => setPositionDistance((i) => !i)

	const [show, setShow] = useState(true)
	const setshow = () => setShow((i) => !i)

	return (
		<div className="App">
			<button
				onClick={setformSetup}
				type="button"
				style={{
					border: '1px',
					fontSize: '1.3rem',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
				}}
			>
				{!!props.enru ? 'Setting up Compitition' : 'Настройка Соревнований'}
			</button>
			{!!formSetup ? (
				<>
					<FormSetup
						web={props.web}
						www={props.www}
						data={data}
						enru={props.enru}
					/>
					<br />
				</>
			) : (
				<div style={{}}> . . . </div>
			)}

			<button
				onClick={setformUser}
				type="button"
				style={{
					border: '1px',
					fontSize: '1.3rem',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
				}}
			>
				{!!props.enru ? 'Registration of athletes' : 'Регистрация участника'}
			</button>
			{!!formUser ? (
				<>
					<FormUser web={props.web} enru={props.enru} />
					<br />
				</>
			) : (
				<div style={{}}> . . . </div>
			)}

			<button
				onClick={setpositionDistance}
				type="button"
				style={{
					border: '1px',
					fontSize: '1.3rem',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
				}}
			>
				{!!props.enru
					? 'Change the order of distances:'
					: 'Порядок следования дистанций:'}
			</button>
			{!!positionDistance ? (
				<>
					<PositionDistance
						web={props.web}
						www={props.www}
						data={data}
						enru={props.enru}
					/>
					<br />
				</>
			) : (
				<div style={{}}> . . . </div>
			)}

			<button
				onClick={setshow}
				type="button"
				style={{
					border: '1px',
					fontSize: '1.3rem',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
					whiteSpace: 'pre-wrap',
				}}
			>
				{!!show
					? !!props.enru
						? 'Start list'
						: 'Стартовый протокол\n( Заплывы )'
					: !!props.enru
						? 'Result card'
						: 'Итоговый протокол\n( Результаты )'}
			</button>
			<br />
			{!!show ? (
				<ShowUserStart
					web={props.web}
					www={props.www}
					data={data}
					enru={props.enru}
				/>
			) : (
				<ShowUserFinish
					web={props.web}
					www={props.www}
					data={data}
					enru={props.enru}
				/>
			)}
			<br />
		</div>
	)
}

export default Home
