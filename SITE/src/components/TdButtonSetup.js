import { useState } from 'react'
import { API_site } from '../API_URL'
//✔❗❌⚠⚙♻📲✈

export default function TdButtonSetup(props) {
	const [setupButton, setSetupButton] = useState(false)

	const [inputR, setInputR] = useState({ idr: '', idz: '' })

	const [isLoadingE, setIsLoadingE] = useState(false)
	const [isErrE, setIsErrE] = useState('')
	const [isLoadingQ, setIsLoadingQ] = useState(false)
	const [isErrQ, setIsErrQ] = useState('')
	const [isLoadingN, setIsLoadingN] = useState(false)
	const [isErrN, setIsErrN] = useState('')
	const [isLoadingD, setIsLoadingD] = useState(false)
	const [isErrD, setIsErrD] = useState('')

	const setUserEmpty = async (e) => {
		e.preventDefault()
		setIsLoadingE(true)
		setIsErrE('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishEmpty: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				if (!res.ok) {
					setIsErrE('⚠!')
					setTimeout(() => {
						setIsErrE('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrE('✔')
			setTimeout(() => {
				setIsErrE('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrE('⚠!')
			setTimeout(() => {
				setIsErrE('')
			}, 1970)
		}
		setIsLoadingE(false)
	} //send setswim
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
	const setUserDNS = async (e) => {
		e.preventDefault()
		setIsLoadingN(true)
		setIsErrN('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishDNQ: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				if (!res.ok) {
					setIsErrN('⚠!')
					setTimeout(() => {
						setIsErrN('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrN('✔')
			setTimeout(() => {
				setIsErrN('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrN('⚠!')
			setTimeout(() => {
				setIsErrN('')
			}, 1970)
		}
		setIsLoadingN(false)
	} //send setswim

	const handlChange = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setInputR((prev) => ({ ...prev, [name]: value }))
	}
	//input

	const submitPoz = async (e) => {
		e.preventDefault()
		if (inputR.idr !== '' && inputR.idz !== '') {
			try {
				const res = await fetch(API_site + '/setpoz', {
					method: 'POST',
					body: JSON.stringify({
						id: props.web,
						swimmer: props.item.id,
						setidr: inputR.idr,
						setidz: inputR.idz,
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
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault()
		setIsLoadingD(true)
		setIsErrD('')
		try {
			const res = await fetch(API_site + '/delswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				setIsErrD('⚠!')
				setTimeout(() => {
					setIsErrD('')
				}, 1970)
			}
			// throw new Error('Ошибка сети или сервера')

			// const result = await res.json()
			// console.log(result)
			setIsErrD('✔')
			setTimeout(() => {
				setIsErrD('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrD('⚠!')
			setTimeout(() => {
				setIsErrD('')
			}, 1970)
		}
		setIsLoadingD(false)
	} //send delswim

	return (
		<>
			<button
				style={{
					fontSize: '0.5rem',
					backgroundColor: 'white',
					padding: '1px',
					borderRadius: '3px',
				}}
				onClick={() => setSetupButton((i) => !i)}
			>
				{!setupButton ? '⚙' : '✖'}
			</button>
			{!!setupButton && (
				<div>
					<button
						onClick={setUserEmpty}
						style={{
							fontSize: '0.5rem',
							backgroundColor: 'white',
							padding: '1px',
							borderRadius: '30%',
							color: 'blue',
						}}
					>
						{!isErrE ? (!isLoadingE ? '♻' : '=✈') : `${isErrE}`}
					</button>
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
					<button
						onClick={setUserDNS}
						style={{
							fontSize: '0.5rem',
							backgroundColor: 'white',
							padding: '1px',
							borderRadius: '3px',
						}}
					>
						{!isErrN ? (!isLoadingN ? 'DNS' : '=✈') : `${isErrN}`}
					</button>

					<input
						name="idr"
						value={inputR.idr}
						onChange={handlChange}
						onBlur={submitPoz}
						min={0}
						type="number"
						placeholder="/⊥\"
						style={{ fontSize: '0.5rem', padding: '1px', width: '1.5rem' }}
					/>

					<input
						name="idz"
						value={inputR.idz}
						onChange={handlChange}
						onBlur={submitPoz}
						min={1}
						type="number"
						placeholder="№"
						style={{ fontSize: '0.5rem', padding: '1px', width: '1.5rem' }}
					/>

					<button
						onClick={deleteUser}
						style={{
							fontSize: '0.5rem',
							backgroundColor: 'white',
							borderRadius: '3px',
						}}
					>
						{!isErrD ? (!isLoadingD ? '❌' : '=✈') : `${isErrD}`}
					</button>
				</div>
			)}
		</>
	)
}
