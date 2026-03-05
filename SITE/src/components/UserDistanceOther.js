import { useRef, useState } from 'react'

function UserDistanceOther(props) {
	const [addistOther, setAddistOther] = useState('')

	const handleCangeAddistOther = (e) => {
		setAddistOther(e.target.value)
		props.dist(e.target.value)
	}
	const mmRef = useRef(null)
	const ssRef = useRef(null)
	const msRef = useRef(null)

	const handleCangeTimeOther = (name, value) => {
		props.setTimeOther((prev) => ({
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
			<input
				style={{
					border: '1px',
					borderRadius: '5px',
					fontFamily: 'Arial',
					textAlign: 'center',
					appearance: 'none',
					width: '50%',
					marginRight: '0.4rem',
				}}
				type="text"
				name="addistOther"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				maxLength={20}
				value={addistOther}
				onChange={handleCangeAddistOther}
				placeholder={!!props.enru ? 'Distance... *' : 'Дистанция... *'}
			/>
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
				value={props.timeOther.mm}
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
				value={props.timeOther.ss}
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
				value={props.timeOther.ms}
				onChange={(e) => handleCangeTimeOther('ms', e.target.value)}
				placeholder="ms"
				size={1}
			/>
			<br />
		</div>
	)
}

export default UserDistanceOther
