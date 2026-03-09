import { useState } from 'react'
import '../App.css'
import FormInfo from './formInfo'
import FormCompetitionName from './formCompetitionName'
import FormRoad from './formRoad'
import { API_site } from '../API_URL'

function FormSetup(props) {
	const [isLoading, setIsLoading] = useState(false)
	const [isErr, setIsErr] = useState('')
	const [isLoadingT, setIsLoadingT] = useState(false)
	const [isErrT, setIsErrT] = useState('')

	const [NameCompitition, setNameCompitition] = useState('')
	const [NameTitle, setNameTitle] = useState('')
	const [Info, setInfo] = useState('')

	const [ShowDate, setShowDate] = useState('true')
	const [ShowTeam, setShowTeam] = useState('true')
	const [ShowTime, setShowTime] = useState('true')
	const [UseGroup, setUseGroup] = useState('true')
	const [UseCategory, setUseCategory] = useState('true')
	const [UseUpRung, setUseUpRung] = useState('true')

	const [road, setRoad] = useState('1')

	const AddSetupSwim = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setIsErr('')
		try {
			const res = await fetch(API_site + '/setupswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					NameCompitition,
					NameTitle,
					Info,
					ShowDate,
					ShowTeam,
					ShowTime,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				if (!res.ok) {
					setIsErr(!props.enru ? 'Ошибка!' : 'Error')
					setTimeout(() => {
						setIsErr('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
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

	const checkRemoveDoubles = async (e) => {
		e.preventDefault()
		setIsLoadingT(true)
		setIsErrT('')
		try {
			const res = await fetch(API_site + '/deldoubl', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()

			const resApp = await fetch(API_site + '/usesport', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!resApp.ok) {
				throw new Error('Ошибка сети или сервера')
			}
			// const resultApp = await resApp.json()
			// console.log(result, resultApp)
			setIsErrT(!props.enru ? 'Успешно!' : 'Successfully!')
			setTimeout(() => {
				setIsErrT('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrT(!props.enru ? 'Ошибка!' : 'Error')
			setTimeout(() => {
				setIsErrT('')
			}, 1970)
		}
		setIsLoadingT(false)
	} //RemoveDoubles

	return (
		<>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onSubmit={AddSetupSwim}
			>
				<FormCompetitionName
					data={props.data}
					NameCompitition={NameCompitition}
					setNameCompitition={setNameCompitition}
					NameTitle={NameTitle}
					setNameTitle={setNameTitle}
					Info={Info}
					setInfo={setInfo}
					enru={props.enru}
				/>
				<FormInfo
					enru={props.enru}
					web={props.web}
					data={props.data}
					ShowDate={ShowDate}
					setShowDate={setShowDate}
					ShowTeam={ShowTeam}
					setShowTeam={setShowTeam}
					ShowTime={ShowTime}
					setShowTime={setShowTime}
					UseGroup={UseGroup}
					setUseGroup={setUseGroup}
					UseCategory={UseCategory}
					setUseCategory={setUseCategory}
					UseUpRung={UseUpRung}
					setUseUpRung={setUseUpRung}
				/>
				<FormRoad
					enru={props.enru}
					data={props.data}
					web={props.web}
					road={road}
					setRoad={setRoad}
				/>
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
				>
					{!isErr
						? !isLoading
							? !props.enru
								? 'Установить'
								: 'Enter'
							: '-  -  -'
						: `${isErr}`}
				</button>
			</form>
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
					marginBottom: '0.4rem',
				}}
				type="button"
				onClick={checkRemoveDoubles}
			>
				{!isErrT
					? !isLoadingT
						? !props.enru
							? 'Удалить дубликаты'
							: 'Remove duplicates'
						: '-  -  -'
					: `${isErrT}`}
			</button>
		</>
	)
}

export default FormSetup
