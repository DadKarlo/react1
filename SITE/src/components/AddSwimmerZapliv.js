import { useEffect, useRef, useState } from 'react'
import { API_site } from '../API_URL'

export default function AddSwimmerZ(props) {
	const cat = props.data?.setup?.UseCategory
	const gro = props.data?.setup?.UseGroup

	const [isLoading, setIsLoading] = useState(false)
	const [isErr, setIsErr] = useState('')

	const [group, setGroup] = useState('')
	const [category, setCategory] = useState('')

	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [birthday, setBirthday] = useState('')
	const [team, setTeam] = useState('')

	const [idz, setIdz] = useState('')
	const [idr, setIdr] = useState('')

	const handleCangeFirstname = (e) => {
		setFirstname(e.target.value)
	}
	const handleCangeLastname = (e) => {
		setLastname(e.target.value)
	}
	const handleCangeBirthday = (e) => {
		setBirthday(e.target.value)
	}
	const handleCangeTeam = (e) => {
		setTeam(e.target.value)
	}

	const handleCangeGroup = (e) => {
		setGroup(e.target.value)
	}
	const handleCangeCategory = (e) => {
		setCategory(e.target.value)
	}

	useEffect(() => {
		if (cat === 'true' && gro === 'true') {
			setCategory(props.itemC)
			setGroup(props.itemG)
		}
	}, [props, cat, gro])

	const [timeOther, setTimeOther] = useState({ mm: '', ss: '', ms: '' }) //Number
	const mmRef = useRef(null)
	const ssRef = useRef(null)
	const msRef = useRef(null)

	const handleCangeTimeOther = (name, value) => {
		setTimeOther((prev) => ({
			...prev,
			[name]: value,
		}))
		if (name === 'mm') {
			ssRef.current.focus()
		}
		if (name === 'ss' && value.length === 2) {
			msRef.current.focus()
		}
		if (name === 'ms' && value.length === 2) {
			msRef.current.blur()
		}
	}

	const TimeStart = ''.concat(
		timeOther.mm.padStart(2, '0'),
		timeOther.ss.padStart(2, '0'),
		timeOther.ms.padStart(2, '0'),
	)

	const AddSwimmer = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setIsErr('')
		try {
			const res = await fetch(API_site + '/adduser', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					firstname,
					lastname,
					birthday,
					team,
					sex: props.itemS,
					group,
					category,
					distance: props.itemD,
					TimeStart,
					TimeFinish: '',
					ids: props.ids,
					idr,
					idz,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				setIsErr('⚠!')
				setTimeout(() => {
					setIsErr('')
				}, 1970)
			}
			// const result = await res.json()
			// console.log(result)
			setIsErr('✔')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErr('⚠!')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		}
		setIsLoading(false)
	}

	const [AddSwimmButton, setAddSwimButton] = useState(true)
	//props

	return (
		<>
			<button
				style={{
					color: 'darkgreen',
					backgroundColor: 'white',
					padding: '1px 3px 1px 3px',
					borderRadius: '4px',
				}}
				onClick={() => setAddSwimButton((i) => !i)}
			>
				+
			</button>
			{!AddSwimmButton && (
				<form onSubmit={AddSwimmer}>
					<input
						type="text"
						name="lastname"
						pattern="[A-Za-zА-ЯЁа-яё]{1,25}"
						title={'Можно использовать A-z и А-я'}
						maxLength={25}
						value={lastname}
						onChange={handleCangeLastname}
						placeholder={!!props.enru ? 'Lastname' : 'Фамилия участника'}
						required
					/>
					<input
						type="text"
						name="firstname"
						pattern="[A-Za-zА-ЯЁа-яё]{1,25}"
						title={'Можно использовать A-z и А-я'}
						maxLength={25}
						value={firstname}
						onChange={handleCangeFirstname}
						placeholder={!!props.enru ? 'Firstname' : 'Имя участника'}
					/>
					<input
						type="date"
						name="birthday"
						value={birthday}
						onChange={handleCangeBirthday}
						placeholder={!!props.enru ? 'Birthday' : 'Дата рождения'}
					/>
					<input
						type="text"
						name="team"
						pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
						title={'Можно использовать A-z и А-я, символы: - , . ( )'}
						maxLength={20}
						value={team}
						onChange={handleCangeTeam}
						placeholder={!!props.enru ? 'Team' : 'Командa'}
					/>
					{cat === 'true' && gro === 'true' ? (
						<></>
					) : (
						<>
							<input
								type="text"
								name="category"
								pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
								title={'Можно использовать A-z и А-я, символы: - , . ( )'}
								maxLength={20}
								value={category}
								onChange={handleCangeCategory}
								placeholder={!!props.enru ? 'Category *' : 'Категория *'}
							/>
							<input
								type="text"
								name="group"
								pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
								title={'Можно использовать A-z и А-я, символы: - , . ( )'}
								maxLength={20}
								value={group}
								onChange={handleCangeGroup}
								placeholder={!!props.enru ? 'Group *' : 'Группа *'}
							/>
						</>
					)}

					<pre>
						<input
							style={{
								width: '23px',
								textAlign: 'center',
								border: '1px',
								borderRadius: '5px',
								fontFamily: 'Arial',
							}}
							ref={mmRef}
							maxLength={2}
							pattern="[0-9]*"
							value={timeOther.mm}
							onChange={(e) => handleCangeTimeOther('mm', e.target.value)}
							placeholder="mm"
							size={1}
						/>
						:
						<input
							style={{
								width: '23px',
								textAlign: 'center',
								border: '1px',
								borderRadius: '5px',
								fontFamily: 'Arial',
							}}
							ref={ssRef}
							maxLength={2}
							pattern="[0-9]*"
							value={timeOther.ss}
							onChange={(e) => handleCangeTimeOther('ss', e.target.value)}
							placeholder="ss"
							size={1}
						/>
						.
						<input
							style={{
								width: '23px',
								textAlign: 'center',
								border: '1px',
								borderRadius: '5px',
								fontFamily: 'Arial',
							}}
							ref={msRef}
							maxLength={2}
							pattern="[0-9]*"
							value={timeOther.ms}
							onChange={(e) => handleCangeTimeOther('ms', e.target.value)}
							placeholder="ms"
							size={1}
						/>
					</pre>
					<input
						name="idr"
						min={0}
						type="number"
						placeholder="/⊥\"
						value={idr}
						onChange={(e) => setIdr(e.target.value)}
						style={{ fontSize: '0.5rem', padding: '1px', width: '1.5rem' }}
						required
					/>
					<input
						name="idz"
						min={1}
						type="number"
						placeholder="№"
						value={idz}
						onChange={(e) => setIdz(e.target.value)}
						style={{ fontSize: '0.5rem', padding: '1px', width: '1.5rem' }}
						required
					/>
					<button
						type="submit"
						style={{
							color: 'darkgreen',
							backgroundColor: 'white',
							padding: '0px 2px px 2px',
							borderRadius: '4px',
						}}
					>
						{!isErr ? (!isLoading ? '+' : '=✈') : `${isErr}`}
					</button>
				</form>
			)}
		</>
	)
}
