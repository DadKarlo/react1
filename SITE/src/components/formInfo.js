import { useEffect } from 'react'
import { API_site } from '../API_URL'

function FormInfo(props) {
	useEffect(() => {
		if (props.data) {
			props.setUseGroup(props.data?.setup?.UseGroup)
			props.setUseCategory(props.data?.setup?.UseCategory)
			props.setUseUpRung(props.data?.setup?.UseUpRung)
		}
	}, [props.data])

	const handleCangeShowDate = (e) => {
		props.setShowDate(e.target.value)
	}

	const handleCangeShowTeam = (e) => {
		props.setShowTeam(e.target.value)
	}

	const handleCangeShowTime = (e) => {
		props.setShowTime(e.target.value)
	}

	const handleCangeUseGroup = async (e) => {
		e.preventDefault()
		props.setUseGroup(e.target.value)
		try {
			const res = await fetch(API_site + '/setupgro', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					UseGroup: e.target.value,
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
		} catch (error) {
			// console.log(error)
		}
	}

	const handleCangeUseCategory = async (e) => {
		e.preventDefault()
		props.setUseCategory(e.target.value)
		try {
			const res = await fetch(API_site + '/setupcat', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					UseCategory: e.target.value,
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
		} catch (error) {
			// console.log(error)
		}
	}

	const handleCangeUseUpRung = async (e) => {
		e.preventDefault()
		props.setUseUpRung(e.target.value)
		try {
			const res = await fetch(API_site + '/setupupru', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					UseUpRung: e.target.value,
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
		} catch (error) {
			// console.log(error)
		}
	}

	return (
		<>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.ShowDate}
				onChange={handleCangeShowDate}
				name="ShowDate"
			>
				<option value={true}>
					{props.enru ? 'Show date of birth' : 'Отображать дату рождения'}
				</option>
				<option value={false}>
					{props.enru
						? `Don't Show the date of birth`
						: 'Не отображать дату рождения'}
				</option>
			</select>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.ShowTeam}
				onChange={handleCangeShowTeam}
				name="ShowTeam"
			>
				<option value={true}>
					{props.enru ? 'Show the Team' : 'Отображать команду'}
				</option>
				<option value={false}>
					{props.enru ? `Don't show the Team` : 'Не отображать команду'}
				</option>
			</select>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.ShowTime}
				onChange={handleCangeShowTime}
				name="ShowTime"
			>
				<option value={true}>
					{props.enru
						? 'Show the application time'
						: 'Отображать заявочное время'}
				</option>
				<option value={false}>
					{props.enru
						? 'Do not show the application time'
						: 'Не отображать заявочное время'}
				</option>
			</select>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.UseGroup}
				onChange={handleCangeUseGroup}
				name="UseGroup"
			>
				<option value={true}>
					{props.enru
						? 'Divide the races into groups'
						: 'Разделять заплывы на группы'}
				</option>
				<option value={false}>
					{props.enru
						? 'Do not divide the races into groups'
						: 'Не разделять заплывы на группы'}
				</option>
			</select>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.UseCategory}
				onChange={handleCangeUseCategory}
				name="UseCategory"
			>
				<option value={true}>
					{props.enru
						? 'Divide the races into categories'
						: 'Разделять заплывы на категории'}
				</option>
				<option value={false}>
					{props.enru
						? 'Do not divide the races into categories'
						: 'Не разделять заплывы на категории'}
				</option>
			</select>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={props.UseUpRung}
				onChange={handleCangeUseUpRung}
				name="UseUpRung"
			>
				<option value={true}>
					{props.enru
						? 'The weaker ones first'
						: 'Сильнейшие заплывы в конце'}{' '}
				</option>
				<option value={false}>
					{props.enru ? 'The strong ones first' : 'Сильнейшие заплывы в начале'}
				</option>
			</select>
		</>
	)
}

export default FormInfo
