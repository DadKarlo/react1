import { useEffect, useState } from 'react'
import TdInput from './TdInput'
import TdTimeStart from './TdTimeStart'
import TdButtonSetup from './TdButtonSetup'
import TdTimeFinish from './TdTimeFinish'
import AddSwimmerZ from './AddSwimmerZapliv'
import TdInputTeam from './TdInputTeam'
import { API_site } from '../API_URL'

export default function ShowUserStart(props) {
	const [data, setDate] = useState(props.data) //ferst render
	const cat = props.data?.setup?.UseCategory
	const gro = props.data?.setup?.UseGroup

	useEffect(() => {
		if (props.data) {
			setDate(props.data)
		}
	}, [props.data])

	const [isLoadingGB, setIsLoadingGB] = useState(false)
	const [isErrGB, setIsErrGB] = useState('')
	const greenBazz = async (e) => {
		e.preventDefault()
		setIsLoadingGB(true)
		setIsErrGB('')
		try {
			const resApp = await fetch(API_site + '/usesport', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!resApp.ok) {
				setIsErrGB('⚠!')
				setTimeout(() => {
					setIsErrGB('')
				}, 1970)
			}
			// const resultApp = await resApp.json()
			// console.log(resultApp)
			setIsErrGB('✔')
			setTimeout(() => {
				setIsErrGB('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrGB('⚠!')
			setTimeout(() => {
				setIsErrGB('')
			}, 1970)
		}
		setIsLoadingGB(false)
	}

	// console.log(data) //const zapliv = user.sportsmens.filter((u) => u.ids === i + 1)
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '2rem',
			}}
		>
			<div style={{ fontSize: '1.2rem' }}>{data?.setup?.NameCompitition}</div>
			<div style={{ fontSize: '0.7rem', marginBottom: '1.5rem' }}>
				{data?.setup?.Info}
			</div>
			<button
				style={{
					padding: '1px',
					backgroundColor: 'grey',
					borderRadius: '5px',
					margin: '2px',
					color: 'white',
					fontFamily: 'Arial',
					fontStyle: 'normal',
				}}
				type="submit"
				onClick={greenBazz}
			>
				{!isErrGB
					? !isLoadingGB
						? !!props.enru
							? 'Updating the structure'
							: 'обновить структуру'
						: '=✈'
					: `${isErrGB}`}
			</button>
			{data?.sportsmens
				?.filter(
					(indids, indexs, selfs) =>
						indexs === selfs.findIndex((p) => p.ids === indids.ids),
				)
				.sort((a, d) => a.ids - d.ids)
				.map((itemS) => (
					<div
						key={itemS.id}
						style={{
							paddingLeft: '1rem',
							paddingRight: '1rem',
							border: '1px solid',
							borderRadius: '10px',
							width: '100%',
							marginBottom: '0.2rem',
						}}
					>
						<>
							{itemS.distance}. {itemS.sex}. {cat === 'true' && itemS?.category}{' '}
							{gro === 'true' && itemS?.group}
						</>
						<div>
							<AddSwimmerZ
								data={data}
								ids={itemS.ids}
								itemD={itemS.distance}
								itemS={itemS.sex}
								enru={props.enru}
								itemC={itemS?.category}
								itemG={itemS?.group}
								web={props.web}
							/>
						</div>
						<>
							{data?.sportsmens
								?.filter((el) => el.ids === itemS.ids)
								.filter(
									(indidz, indexz, selfz) =>
										indexz === selfz.findIndex((p) => p.idz === indidz.idz),
								)
								.sort((a, d) => a.idz - d.idz)
								.map((itemZ) => (
									<div
										key={itemZ.id}
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '0.7rem',
										}}
									>
										<div
											style={{
												margin: '1%',
												marginTop: '0.8rem',
												padding: '0px',
												width: '40%',
												textAlign: 'left',
											}}
										>
											{!!props.enru ? 'Session' : 'Заплыв'} № {itemZ.idz}
										</div>
										<table>
											<thead>
												<tr>
													<th style={{ fontSize: '0.5rem' }}>
														{!!props.enru ? 'Lane' : 'Дорожка'}
													</th>
													<th
														style={{
															fontSize: '0.5rem',
															textAlign: 'left',
															paddingLeft: '0.5rem',
														}}
													>
														{!!props.enru ? 'Name' : 'Участник'}
													</th>
													{data?.setup?.ShowDate === 'true' && (
														<th style={{ fontSize: '0.5rem' }}>
															{!!props.enru ? 'Year' : 'Дата рождения'}
														</th>
													)}
													<th style={{ fontSize: '0.5rem' }}>|</th>
													{/* РАЗДЕЛИТЕЛЬ */}
													{data?.setup?.ShowTeam === 'true' && (
														<th style={{ fontSize: '0.5rem' }}>
															{!!props.enru ? 'Team ' : 'Команда'}
														</th>
													)}
													<th style={{ fontSize: '0.5rem' }}>|</th>
													{/* РАЗДЕЛИТЕЛЬ */}
													{data?.setup?.ShowTime === 'true' && (
														<th style={{ fontSize: '0.5rem' }}>
															{!!props.enru ? 'Time' : 'Время'}
														</th>
													)}
													<th style={{ fontSize: '0.5rem' }}>|</th>
													{/* РАЗДЕЛИТЕЛЬ */}
													<th style={{ fontSize: '0.5rem' }}>
														{!!props.enru ? 'Result' : 'Результат'}
													</th>
												</tr>
											</thead>
											<tbody>
												{data?.sportsmens
													?.filter(
														(el) =>
															el.ids === itemS.ids && el.idz === itemZ.idz,
													)
													.sort((a, d) => a.idr - d.idr)
													.map((item) => (
														<tr key={item.id}>
															<td>{item.idr}</td>
															<td>
																<TdInput item={item} web={props.web} />
															</td>
															{data?.setup?.ShowDate === 'true' && (
																<td style={{ fontSize: '0.45rem' }}>
																	{item.birthday}
																</td>
															)}
															<td style={{ fontSize: '0.5rem' }}> </td>
															{/* РАЗДЕЛИТЕЛЬ */}
															{data?.setup?.ShowTeam === 'true' && (
																<td style={{ fontSize: '0.45rem' }}>
																	<TdInputTeam item={item} web={props.web} />
																</td>
															)}
															<td style={{ fontSize: '0.5rem' }}> </td>
															{/* РАЗДЕЛИТЕЛЬ */}
															{data?.setup?.ShowTime === 'true' && (
																<td style={{ fontSize: '0.45rem' }}>
																	<TdTimeStart item={item} />
																</td>
															)}
															<td style={{ fontSize: '0.5rem' }}> </td>
															{/* РАЗДЕЛИТЕЛЬ */}
															<td
																style={{
																	fontSize: '0.45rem',
																	whiteSpace: 'nowrap',
																}}
															>
																{item.TimeFinish === 'DSQ' ||
																item.TimeFinish === 'DNS' ? (
																	<>{item.TimeFinish}</>
																) : (
																	<TdTimeFinish item={item} web={props.web} />
																)}
															</td>
															<td>
																<TdButtonSetup item={item} web={props.web} />
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								))}
						</>
					</div>
				))}
		</div>
	)
}
