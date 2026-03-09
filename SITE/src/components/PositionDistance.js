import { useState, useEffect } from 'react'
import { API_site } from '../API_URL'
// import debounce from 'lodash.debounce'

function PositionDistance(props) {
	const pozDist = props.data?.setup?.DistancePosition
	const cat = props.data?.setup?.UseCategory
	const gro = props.data?.setup?.UseGroup

	const [poz, setPoz] = useState(pozDist)

	useEffect(() => {
		if (props.data) {
			setPoz(pozDist)
		}
	}, [props.data, pozDist])

	const changePoz = async (id, e) => {
		setPoz(poz.map((user) => (user.id === id ? { ...user } : user)))
		e.preventDefault()
		if (e.target.value) {
			try {
				const resApp = await fetch(API_site + '/usesport', {
					method: 'POST',
					body: JSON.stringify({
						id: props.web,
						idstart: id,
						idfinish: e.target.value,
					}),
					headers: { 'Content-type': 'application/json' },
				})
				if (!resApp.ok) {
					throw new Error('Ошибка сети или сервера')
				}
				// const resultApp = await resApp.json()

				// console.log(resultApp)
			} catch (error) {
				// console.log(error)
			}
		}
	}

	return (
		<div
			style={{
				textAlign: 'center',
			}}
		>
			<ul
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					marginLeft: 'auto',
					marginRight: 'auto',
					overflow: 'auto',
					height: '7rem',
					resize: 'both',
					width: '60%',
				}}
			>
				{poz?.map((item, index) => (
					<li
						key={item.id}
						style={{
							textAlign: 'left',
							marginLeft: '1.5rem',
							listStyleType: 'none',
						}}
					>
						{index + 1}.{' '}
						<input
							type="number"
							onChange={(e) => changePoz(item.id, e)}
							style={{ width: '1.9rem' }}
						/>{' '}
						{item?.distance} {item?.sex} {cat === 'true' ? item?.category : ''}{' '}
						{gro === 'true' ? item?.group : ''}{' '}
					</li>
				))}
			</ul>
		</div>
	)
}
export default PositionDistance

//<=props:   web={props.web} www={props.www} data={data}
