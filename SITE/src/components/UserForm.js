import UserName from './UserName'
import UserRang from './UserRang'
import UserDistanceOne from './UserDistanceOne'
import { useEffect, useState } from 'react'
import UserDistanceTwo from './UserDistanceTwo'
import UserDistanceThree from './UserDistanceThree'
import UserDistanceOther from './UserDistanceOther'
import { API_site } from '../API_URL'

function FormUser(props) {
	const [addist1, setAddist1] = useState('') //ranging
	const [addist2, setAddist2] = useState('') //ranging
	const [addist3, setAddist3] = useState('') //ranging
	const [addistOther, setAddistOther] = useState('') //ranging
	const [time1, setTime1] = useState({ mm: '', ss: '', ms: '' }) //Number
	const [time2, setTime2] = useState({ mm: '', ss: '', ms: '' }) //Number
	const [time3, setTime3] = useState({ mm: '', ss: '', ms: '' }) //Number
	const [timeOther, setTimeOther] = useState({ mm: '', ss: '', ms: '' }) //Number

	const [sex, setSex] = useState('Мужчины') //ranging
	useEffect(() => {
		!!props.enru ? setSex(`Man's`) : setSex('Мужчины')
	}, [props.enru])

	const [category, setCategory] = useState('') //ranging
	const [group, setGroup] = useState('') //ranging

	const [firstname, setFirstName] = useState('') //optional
	const [lastname, setLastname] = useState('') //optional
	const [birthday, setBirthday] = useState('') //optional
	const [team, setTeam] = useState('') //optional

	const [isLoading, setIsLoading] = useState(false)
	const [isErr, setIsErr] = useState('')

	const pushtime1 = ''.concat(
		time1.mm.padStart(2, '0'),
		time1.ss.padStart(2, '0'),
		time1.ms.padStart(2, '0'),
	)

	const pushtime2 = ''.concat(
		time2.mm.padStart(2, '0'),
		time2.ss.padStart(2, '0'),
		time2.ms.padStart(2, '0'),
	)

	const pushtime3 = ''.concat(
		time3.mm.padStart(2, '0'),
		time3.ss.padStart(2, '0'),
		time3.ms.padStart(2, '0'),
	)

	const pushtimeOther = ''.concat(
		timeOther.mm.padStart(2, '0'),
		timeOther.ss.padStart(2, '0'),
		timeOther.ms.padStart(2, '0'),
	)

	const AddUserSwimm = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setIsErr('')
		try {
			const res = await fetch(API_site + '/usesport', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					firstname,
					lastname,
					birthday,
					team,
					sex,
					group,
					category,
					addist1,
					time1: pushtime1,
					addist2,
					time2: pushtime2,
					addist3,
					time3: pushtime3,
					addistOther,
					timeOther: pushtimeOther,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				setIsErr(!props.enru ? 'Ошибка!' : 'Error')
				setTimeout(() => {
					setIsErr('')
				}, 1970)
			}
			// const result = await res.json()
			// console.log(result)
			setIsErr(!props.enru ? 'Успешно!' : 'Successfully!')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErr(!props.enru ? 'Ошибка!' : 'Error')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		}
		setIsLoading(false)
	} //send

	return (
		<form onSubmit={AddUserSwimm}>
			<UserName
				enru={props.enru}
				firstname={setFirstName}
				lastname={setLastname}
				birthday={setBirthday}
				team={setTeam}
			/>
			<UserRang
				enru={props.enru}
				sex={setSex}
				group={setGroup}
				category={setCategory}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<UserDistanceOne
					enru={props.enru}
					dist={setAddist1}
					time1={time1}
					setTime1={setTime1}
				/>
				<UserDistanceTwo
					enru={props.enru}
					dist={setAddist2}
					time2={time2}
					setTime2={setTime2}
				/>
				<UserDistanceThree
					enru={props.enru}
					dist={setAddist3}
					time3={time3}
					setTime3={setTime3}
				/>
				<UserDistanceOther
					dist={setAddistOther}
					timeOther={timeOther}
					setTimeOther={setTimeOther}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<button
					style={{
						padding: '1px',
						borderRadius: '24px',
						width: '50%',
						color: 'white',
						backgroundColor: 'green',
						fontFamily: 'Arial',
						fontStyle: 'normal',
						boxSizing: 'border-box',
						fontSize: '1.1rem',
						cursor: 'pointer',
						marginBottom: '0.4rem',
					}}
					type="submit"
				>
					{!isErr
						? !isLoading
							? !props.enru
								? 'Добавить участника'
								: 'Add a Swimmer'
							: '-  -  -'
						: `${isErr}`}
				</button>
				<button
					style={{
						padding: '1px',
						borderRadius: '24px',
						borderColor: 'red',
						width: '50%',
						color: 'white',
						backgroundColor: 'darkred',
						fontFamily: 'Arial',
						fontStyle: 'normal',
						boxSizing: 'border-box',
						fontSize: '1.1rem',
						cursor: 'pointer',
					}}
					type="button"
					onClick={() => window.location.reload()}
				>
					{!props.enru ? 'Очистить' : 'Clear'}
				</button>
			</div>
		</form>
	)
}
export default FormUser
