import { useRef, useState } from 'react'

function UserDistanceOne(props) {
	const distanceEN = [
		'Distance...',
		'25 m Freestyle',
		'50 m Freestyle',
		'100 m Freestyle',
		'200 m Freestyle',
		'400 m Freestyle',
		'800 m Freestyle',
		'1500 m Freestyle',
		'25 m Backstroke',
		'50 m Backstroke',
		'100 m Backstroke',
		'200 m Backstroke',
		'25 m Breaststroke',
		'50 m Breaststroke',
		'100 m Breaststroke',
		'200 m Breaststroke',
		'25 m Butterfly',
		'50 m Butterfly',
		'100 m Butterfly',
		'200 m Butterfly',
		'100 m Individual Medley',
		'200 m Individual Medley',
		'400 m Individual Medley',
		'3 km',
		'5 km',
		'10 km',
	]
	const distanceRU = [
		'Дистанция...',
		'25 м вольный стиль',
		'50 м вольный стиль',
		'100 м вольный стиль',
		'200 м вольный стиль',
		'400 м вольный стиль',
		'800 м вольный стиль',
		'1500 м вольный стиль',
		'25 м на спине',
		'50 м на спине',
		'100 м на спине',
		'200 м на спине',
		'25 м брасс',
		'50 м брасс',
		'100 м брасс',
		'200 м брасс',
		'25 м баттерфляй',
		'50 м баттерфляй',
		'100 м баттерфляй',
		'200 м баттерфляй',
		'100 м комплекс',
		'200 м комплекс',
		'400 м комплекс',
		'3 км',
		'5 км',
		'10 км',
	]

	const [distant, setDistant] = useState('')
	const handleCangeDistant = (e) => {
		setDistant(e.target.value)
		if (e.target.value === 'Дистанция...' || e.target.value === 'Distance...') {
			props.dist('')
		} else {
			props.dist(e.target.value)
		}
	}
	const mmRef = useRef(null)
	const ssRef = useRef(null)
	const msRef = useRef(null)

	const handleCangeTime1 = (name, value) => {
		props.setTime1((prev) => ({
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

	return (
		<div
			style={{
				padding: '1px',
				border: '1px solid',
				borderRadius: '5px',
				width: '50%',
				boxSizing: 'border-box',
				marginBottom: '0.4rem',
				whiteSpace: 'nowrap',
			}}
		>
			<select
				style={{
					border: '1px',
					borderRadius: '5px',
					fontFamily: 'Arial',
					textAlign: 'center',
					appearance: 'none',
					width: '50%',
					marginRight: '0.4rem',
				}}
				value={distant}
				onChange={handleCangeDistant}
			>
				{!!props.enru
					? distanceEN.map((use) => (
							<option key={use.valueOf()} value={use.valueOf()}>
								{use.valueOf()}
							</option>
						))
					: distanceRU.map((use) => (
							<option key={use.valueOf()} value={use.valueOf()}>
								{use.valueOf()}
							</option>
						))}
			</select>
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
				value={props.time1.mm}
				onChange={(e) => handleCangeTime1('mm', e.target.value)}
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
				value={props.time1.ss}
				onChange={(e) => handleCangeTime1('ss', e.target.value)}
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
				value={props.time1.ms}
				onChange={(e) => handleCangeTime1('ms', e.target.value)}
				placeholder="ms"
				size={1}
			/>
			<br />
		</div>
	)
}

export default UserDistanceOne
