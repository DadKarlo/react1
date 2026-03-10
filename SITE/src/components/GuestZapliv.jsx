import { useEffect, useState } from 'react'

export default function GuestZapliv(props) {
	const [data, setDate] = useState(props.data) //ferst render
	const cat = props.data?.setup?.UseCategory
	const gro = props.data?.setup?.UseGroup

	useEffect(() => {
		if (props.data) {
			setDate(props.data)
		}
	}, [props.data])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '1rem',
				margin: '2rem',
			}}
		>
			<div style={{ fontSize: '1.2rem' }}>{data?.setup?.NameCompitition}</div>
			<div style={{ fontSize: '0.7rem', marginBottom: '1.5rem' }}>
				{data?.setup?.Info}
			</div>

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
															<td style={{ textAlign: 'left' }}>
																{item.lastname} {item.firstname}
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
																	{item.team}
																</td>
															)}
															<td style={{ fontSize: '0.5rem' }}> </td>
															{/* РАЗДЕЛИТЕЛЬ */}
															{data?.setup?.ShowTime === 'true' && (
																<td style={{ fontSize: '0.45rem' }}>
																	{item?.TimeStart?.slice(0, 2)}:
																	{item?.TimeStart?.slice(2, 4)}.
																	{item?.TimeStart?.slice(4, 6)}
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
																{item.TimeFinish === '' ||
																item.TimeFinish === 'DSQ' ||
																item.TimeFinish === 'DNS' ? (
																	<>{item.TimeFinish}</>
																) : (
																	<>
																		{item?.TimeFinish?.slice(0, 2)}:
																		{item?.TimeFinish?.slice(2, 4)}.
																		{item?.TimeFinish?.slice(4, 6)}
																	</>
																)}
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
