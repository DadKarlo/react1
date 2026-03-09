import { useEffect, useState } from 'react'
import { API_site } from '../API_URL'

export default function TdInput(props) {
	let timeoutInputChangeFocus //global
	const [isFocus, setIsFocus] = useState(false)
	const [Lastname, setLastname] = useState(props.item.lastname)
	const [Firstname, setFirstname] = useState(props.item.firstname)
	const [copyLastname, copysetLastname] = useState(Lastname)
	const [copyFirstname, copysetFirstname] = useState(Firstname)

	useEffect(() => {
		setLastname(props.item.lastname)
		setFirstname(props.item.firstname)
	}, [props])
	useEffect(() => {
		if (!isFocus) {
			copysetLastname(Lastname)
			copysetFirstname(Firstname)
		}
	}, [isFocus, Firstname, Lastname])

	const handlChangeLastname = (e) => {
		e.preventDefault()
		copysetLastname(e.target.value)
	}
	const handlChangeFirstname = (e) => {
		e.preventDefault()
		copysetFirstname(e.target.value)
	}

	//save component isfocus
	const onFocusir = () => {
		setIsFocus(true)
		clearTimeout(timeoutInputChangeFocus)
	}
	//Submit name
	const submitName = async () => {
		try {
			const res = await fetch(API_site + '/setname', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					swimmer: props.item.id,
					firstname: copyFirstname,
					lastname: copyLastname,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				// console.log('Ошибка сети или сервера!')
			}
			// const result = await res.json()
			// console.log(result)
		} catch (error) {
			// console.log(error)
		}
		timeoutInputChangeFocus = setTimeout(() => {
			setIsFocus(false)
		}, 10000)
	}

	return (
		<>
			<input
				name="lastname"
				type="text"
				pattern="[A-Za-zА-ЯЁа-яё]{1,25}"
				title={'Можно использовать A-z и А-я'}
				maxLength={25}
				size={10}
				onFocus={onFocusir}
				onClick={onFocusir}
				onBlur={submitName}
				value={!isFocus ? Lastname : copyLastname}
				onChange={handlChangeLastname}
			/>{' '}
			<input
				name="firstname"
				type="text"
				pattern="[A-Za-zА-ЯЁа-яё]{1,25}"
				title={'Можно использовать A-z и А-я'}
				maxLength={25}
				size={10}
				onClick={onFocusir}
				onFocus={onFocusir}
				onBlur={submitName}
				value={!isFocus ? Firstname : copyFirstname}
				onChange={handlChangeFirstname}
			/>
		</>
	)
}
