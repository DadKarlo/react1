import { useState } from 'react'
import GuestProtocols from './GuestProtocols'
import GuestZapliv from './GuestZapliv'

export default function GuestButton(props) {
	const [show, setShow] = useState(true)
	const setshow = () => setShow((i) => !i)

	return (
		<div style={{ width: '100%', fontFamily: 'Arial' }}>
			<button
				onClick={setshow}
				style={{
					width: '100%',
					whiteSpace: 'pre',
					textAlign: 'left',
					border: '1px',
					fontSize: '1.2rem',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					cursor: 'pointer',
					margin: '0.8rem',
					flexWrap: 'nowrap',
				}}
			>
				{!show
					? !!props.enru
						? 'Start list'
						: 'Стартовый протокол ( Заплывы )'
					: !!props.enru
						? 'Result card'
						: 'Итоговый протокол ( Результаты )'}
			</button>
			{!!show ? (
				<GuestProtocols data={props.data} enru={props.enru} />
			) : (
				<GuestZapliv data={props.data} enru={props.enru} />
			)}
		</div>
	)
}
