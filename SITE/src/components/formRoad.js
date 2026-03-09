import { useEffect } from 'react'
import { API_site } from '../API_URL'

function FormRoad(props) {
	useEffect(() => {
		if (props.data) {
			props.setRoad(props.data?.setup?.Lines)
		}
	}, [props.data])

	const handleCangeRoad = async (e) => {
		props.setRoad(e.target.value)
		e.preventDefault()
		try {
			const res = await fetch(API_site + '/setuproad', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					Lines: e.target.value,
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

	const roadsRU = [
		{
			value: 1,
			read: props.enru ? 'Number of Lane: 1' : 'Количество дорожек: 1',
		},
		{
			value: 2,
			read: props.enru ? 'Number of Lane: 2' : 'Количество дорожек: 2',
		},
		{
			value: 3,
			read: props.enru ? 'Number of Lane: 3' : 'Количество дорожек: 3',
		},
		{
			value: 4,
			read: props.enru ? 'Number of Lane: 4' : 'Количество дорожек: 4',
		},
		{
			value: 5,
			read: props.enru ? 'Number of Lane: 5' : 'Количество дорожек: 5',
		},
		{
			value: 6,
			read: props.enru ? 'Number of Lane: 6' : 'Количество дорожек: 6',
		},
		{
			value: 7,
			read: props.enru ? 'Number of Lane: 7' : 'Количество дорожек: 7',
		},
		{
			value: 8,
			read: props.enru ? 'Number of Lane: 8' : 'Количество дорожек: 8',
		},
		{
			value: 9,
			read: props.enru ? 'Number of Lane: 9' : 'Количество дорожек: 9',
		},
		{
			value: 10,
			read: props.enru ? 'Number of Lane: 10' : 'Количество дорожек: 10',
		},
	]

	return (
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
			value={props.road}
			onChange={handleCangeRoad}
		>
			{roadsRU.map((road) => (
				<option key={road.value} value={road.value}>
					{road.read}
				</option>
			))}
		</select>
	)
}

export default FormRoad
