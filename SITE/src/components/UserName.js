import { useState } from 'react'

function UserName(props) {
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [birthday, setBirthday] = useState('')
	const [team, setTeam] = useState('')

	const handleCangeFirstname = (e) => {
		setFirstname(e.target.value)
		props.firstname(e.target.value)
	}
	const handleCangeLastname = (e) => {
		setLastname(e.target.value)
		props.lastname(e.target.value)
	}
	const handleCangeBirthday = (e) => {
		setBirthday(e.target.value)
		props.birthday(e.target.value)
	}
	const handleCangeTeam = (e) => {
		setTeam(e.target.value)
		props.team(e.target.value)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					margin: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				name="lastname"
				pattern="[A-Za-zА-ЯЁа-яё\s]{1,25}"
				title={'Можно использовать A-z и А-я'}
				maxLength={25}
				value={lastname}
				onChange={handleCangeLastname}
				placeholder={!!props.enru ? 'Lastname' : 'Фамилия участника'}
				required
			/>
			<input
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
				type="text"
				name="firstname"
				pattern="[A-Za-zА-ЯЁа-яё\s]{1,25}"
				title={'Можно использовать A-z и А-я'}
				maxLength={25}
				value={firstname}
				onChange={handleCangeFirstname}
				placeholder={!!props.enru ? 'Firstname' : 'Имя участника'}
			/>

			<input
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
				type="text"
				name="birthday"
				value={birthday}
				onChange={handleCangeBirthday}
				placeholder={!!props.enru ? 'Birthday' : 'Дата рождения'}
			/>
			<input
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
				type="text"
				name="team"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				value={team}
				onChange={handleCangeTeam}
				placeholder={!!props.enru ? 'Team' : 'Командa'}
			/>
		</div>
	) //???
}
export default UserName
