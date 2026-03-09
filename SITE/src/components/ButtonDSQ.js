import { useState } from 'react'
import { API_site } from '../API_URL'

export default function ButtonDSQ(props) {
	const [isLoadingQ, setIsLoadingQ] = useState(false)
	const [isErrQ, setIsErrQ] = useState('')

	const setUserDSQ = async (e) => {
		e.preventDefault()
		setIsLoadingQ(true)
		setIsErrQ('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishDSQ: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				if (!res.ok) {
					setIsErrQ('⚠!')
					setTimeout(() => {
						setIsErrQ('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrQ('✔')
			setTimeout(() => {
				setIsErrQ('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrQ('⚠!')
			setTimeout(() => {
				setIsErrQ('')
			}, 1970)
		}
		setIsLoadingQ(false)
	} //send setswim

	return (
		<button
			onClick={setUserDSQ}
			style={{
				fontSize: '0.5rem',
				backgroundColor: 'white',
				padding: '1px',
				borderRadius: '3px',
			}}
		>
			{!isErrQ ? (!isLoadingQ ? 'DSQ' : '=✈') : `${isErrQ}`}
		</button>
	)
}
