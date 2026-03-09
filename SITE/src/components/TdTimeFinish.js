import { useEffect, useState, useRef } from 'react'
import { API_site } from '../API_URL'

export default function TdTimeFinish(props) {
	//props.TimeFinish  timeF"TimeFinish": "",  + pushtimeFinish

	let timeoutInputChangeFocus3 //global
	const [isFocus, setIsFocus] = useState(false)

	const [timeF, setTimeF] = useState(props.item.TimeFinish)
	useEffect(() => {
		setTimeF(props.item.TimeFinish)
	}, [props])

	const onFocusir = () => {
		setIsFocus(true)
		clearTimeout(timeoutInputChangeFocus3)
	}

	useEffect(() => {
		if (!isFocus) {
			setTimeFinish((prev) => ({
				...prev,
				mm: timeF?.slice(0, 2),
				ss: timeF?.slice(2, 4),
				ms: timeF?.slice(4, 6),
			}))
		}
	}, [isFocus, timeF])

	const [timeFinish, setTimeFinish] = useState({ mm: '', ss: '', ms: '' }) //Number

	const mmRef = useRef(null)
	const ssRef = useRef(null)
	const msRef = useRef(null)

	const handleCangeFinish = (name, value) => {
		setTimeFinish((prev) => ({
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

	const MM = timeFinish.mm
	const SS = timeFinish.ss
	const MS = timeFinish.ms

	const submitTimeFinish = async (e) => {
		try {
			const res = await fetch(API_site + '/timefin', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					swimmer: props.item.id,
					TimeFinish: ''.concat(
						mmRef.current.value.padStart(2, '0'),
						ssRef.current.value.padStart(2, '0'),
						msRef.current.value.padStart(2, '0'),
					),
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
		timeoutInputChangeFocus3 = setTimeout(() => {
			setIsFocus(false)
		}, 10000)
	}

	return (
		<div style={{ fontSize: '0.45rem' }}>
			<input
				name="mm"
				style={{
					width: '14px',
					textAlign: 'center',
					border: '1px',
					borderRadius: '5px',
					fontFamily: 'Arial',
					fontSize: '0.45rem',
				}}
				ref={mmRef}
				maxLength={2}
				pattern="[0-9]*"
				value={!isFocus ? timeF?.slice(0, 2) : MM}
				onFocus={onFocusir}
				onClick={onFocusir}
				onBlur={submitTimeFinish}
				onChange={(e) => handleCangeFinish('mm', e.target.value)}
				placeholder="mm"
				size={1}
			/>
			:
			<input
				name="ss"
				style={{
					width: '14px',
					textAlign: 'center',
					border: '1px',
					borderRadius: '5px',
					fontFamily: 'Arial',
					fontSize: '0.45rem',
				}}
				ref={ssRef}
				maxLength={2}
				pattern="[0-9]*"
				value={!isFocus ? timeF?.slice(2, 4) : SS}
				onFocus={onFocusir}
				onClick={onFocusir}
				onBlur={submitTimeFinish}
				onChange={(e) => handleCangeFinish('ss', e.target.value)}
				placeholder="ss"
				size={1}
			/>
			.
			<input
				name="ms"
				style={{
					width: '14px',
					textAlign: 'center',
					border: '1px',
					borderRadius: '5px',
					fontFamily: 'Arial',
					fontSize: '0.45rem',
				}}
				ref={msRef}
				maxLength={2}
				pattern="[0-9]*"
				value={!isFocus ? timeF?.slice(4, 6) : MS}
				onFocus={onFocusir}
				onClick={onFocusir}
				onBlur={submitTimeFinish}
				onChange={(e) => handleCangeFinish('ms', e.target.value)}
				placeholder="ms"
				size={1}
			/>
		</div>
	)
}
