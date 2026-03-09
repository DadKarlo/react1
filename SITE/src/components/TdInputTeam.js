import { useEffect, useState } from 'react'
import { API_site } from '../API_URL'

export default function TdInputTeam(props) {
	let timeoutInputChangeFocus2 //global
	const [isFocus, setIsFocus] = useState(false)
	const [Team, setTeam] = useState(props.item.team)
	const [copyTeam, copysetTeam] = useState(Team)

	useEffect(() => {
		setTeam(props.item.team)
	}, [props])

	useEffect(() => {
		if (!isFocus) {
			copysetTeam(Team)
		}
	}, [isFocus, Team])

	const handlChangeTeam = (e) => {
		e.preventDefault()
		copysetTeam(e.target.value)
	}

	//save component isfocus
	const onFocusir = () => {
		setIsFocus(true)
		clearTimeout(timeoutInputChangeFocus2)
	}
	//Submit name
	const submitTeam = async () => {
		try {
			const res = await fetch(API_site + '/setname', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					swimmer: props.item.id,
					team: copyTeam,
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
		timeoutInputChangeFocus2 = setTimeout(() => {
			setIsFocus(false)
		}, 15000)
	}

	return (
		<input
			type="text"
			name="team"
			pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
			title={'Можно использовать A-z и А-я, символы: - , . ( )'}
			maxLength={20}
			size={7}
			onFocus={onFocusir}
			onClick={onFocusir}
			value={!isFocus ? Team : copyTeam}
			onBlur={submitTeam}
			onChange={handlChangeTeam}
			placeholder={!!props.enru ? 'Team' : 'Командa'}
		/>
	)
}
