import { useEffect, useState } from 'react'

export default function GuestProtocols(props) {
	const [data, setDate] = useState([]) //ferst render
	useEffect(() => {
		if (props.data) {
			setDate(props.data)
		}
	}, [props.data])

	const plase = data?.setup?.DistancePosition.filter(
		(person, index, self) =>
			index ===
			self.findIndex(
				(p) => p.distance === person.distance && p.sex === person.sex,
			),
	)

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
			<>
				{plase?.map((item1) => (
					<div
						key={item1.id}
						style={
							data?.sportsmens
								?.filter(
									(el) =>
										el.distance === item1.distance && el.sex === item1.sex,
								)
								.find((o) => o.TimeFinish !== '') && {
								paddingLeft: '1rem',
								paddingRight: '1rem',
								border: '1px solid',
								borderRadius: '10px',
								width: '100%',
								marginBottom: '0.2rem',
							}
						}
					>
						{data?.sportsmens
							?.filter(
								(el) => el.distance === item1.distance && el.sex === item1.sex,
							)
							.find((o) => o.TimeFinish !== '') && (
							<div key={item1.id}>
								<div style={{ marginBottom: '1rem' }}>
									{item1.distance}. {item1.sex}
								</div>
								{data?.sportsmens
									?.filter(
										(el) =>
											el.distance === item1.distance && el.sex === item1.sex,
									)
									.filter(
										(person, index, self) =>
											index ===
											self.findIndex(
												(p) =>
													p.distance === person.distance &&
													p.sex === person.sex &&
													p.group === person.group &&
													p.category === person.category,
											),
									)
									.map((item2) => (
										<div
											key={item2.id}
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: '0.7rem',
											}}
										>
											<div style={{ width: '80%' }}>
												{data?.sportsmens
													?.filter(
														(el) =>
															el.distance === item2.distance &&
															el.sex === item2.sex &&
															el.group === item2.group &&
															el.category === item2.category,
													)
													.find((o) => o.TimeFinish !== '') && (
													<span style={{ float: 'left' }}>
														{item2?.category === ''
															? ''
															: !!props.enru
																? 'Category: '
																: 'Категория: '}
														{item2?.category}
													</span>
												)}
												{data?.sportsmens
													?.filter(
														(el) =>
															el.distance === item2.distance &&
															el.sex === item2.sex &&
															el.group === item2.group &&
															el.category === item2.category,
													)
													.find((o) => o.TimeFinish !== '') && (
													<span style={{ float: 'right' }}>
														{item2?.group === ''
															? ''
															: !!props.enru
																? 'Group: '
																: 'Группа: '}
														{item2?.group}
													</span>
												)}
											</div>
											{data?.sportsmens
												?.filter(
													(el) =>
														el.distance === item2.distance &&
														el.sex === item2.sex &&
														el.group === item2.group &&
														el.category === item2.category,
												)
												.find((u) => u.TimeFinish !== '') && (
												<table style={{ width: '70%', marginBottom: '10px' }}>
													<thead>
														<tr key={item2.id}>
															<th style={{ fontSize: '0.55rem' }}>
																{!!props.enru ? 'Place' : 'Место'}
															</th>
															<th style={{ fontSize: '0.55rem' }}>
																{!!props.enru ? 'Name' : 'Участник'}
															</th>
															<th style={{ fontSize: '0.55rem' }}>
																{!!props.enru ? 'Year' : 'Дата рождения'}
															</th>
															<th style={{ fontSize: '0.55rem' }}>|</th>
															{/* РАЗДЕЛИТЕЛЬ */}
															<th style={{ fontSize: '0.55rem' }}>
																{!!props.enru ? 'Team ' : 'Команда'}
															</th>
															<th style={{ fontSize: '0.55rem' }}>|</th>
															{/* РАЗДЕЛИТЕЛЬ */}
															<th style={{ fontSize: '0.55rem' }}>
																{!!props.enru ? 'Time' : 'Время'}
															</th>
														</tr>
													</thead>
													<tbody>
														{data?.sportsmens
															?.filter(
																(el) =>
																	el.distance === item2.distance &&
																	el.sex === item2.sex &&
																	el.group === item2.group &&
																	el.category === item2.category,
															)
															.filter((i) => i.TimeFinish.length === 6)
															.sort((a, d) => a.TimeFinish - d.TimeFinish)
															.map((item3, ind) => (
																<tr
																	key={item3.id}
																	style={{ fontSize: '0.5rem' }}
																>
																	<td>{ind + 1}</td>
																	<td style={{ textAlign: 'left' }}>
																		{item3.lastname} {item3.firstname}
																	</td>
																	<td>{item3.birthday}</td>
																	<td> </td>
																	<td>{item3.team}</td>
																	<td> </td>
																	<td
																		style={{
																			fontSize: '0.45rem',
																			whiteSpace: 'nowrap',
																		}}
																	>
																		{item3.TimeFinish.slice(0, 2)}:
																		{item3.TimeFinish.slice(2, 4)}.
																		{item3.TimeFinish.slice(4, 6)}
																	</td>
																</tr>
															))}
													</tbody>
													<tfoot>
														<tr style={{ height: '5px' }}></tr>
														{data?.sportsmens
															?.filter(
																(el) =>
																	el.distance === item2.distance &&
																	el.sex === item2.sex &&
																	el.group === item2.group &&
																	el.category === item2.category,
															)
															.filter((i) => i.TimeFinish === 'DSQ')
															.map((item4) => (
																<tr
																	key={item4.id}
																	style={{ fontSize: '0.5rem' }}
																>
																	<td> {item4.TimeFinish}</td>
																	<td style={{ textAlign: 'left' }}>
																		{item4.lastname} {item4.firstname}{' '}
																	</td>
																	<td>{item4.birthday}</td>
																	<td> </td>
																	<td>{item4.team}</td>
																</tr>
															))}
														<tr style={{ height: '4px' }}></tr>
														{data?.sportsmens
															?.filter(
																(el) =>
																	el.distance === item2.distance &&
																	el.sex === item2.sex &&
																	el.group === item2.group &&
																	el.category === item2.category,
															)
															.filter((i) => i.TimeFinish === 'DNS')
															.map((item4) => (
																<tr
																	key={item4.id}
																	style={{ fontSize: '0.5rem' }}
																>
																	<td> {item4.TimeFinish}</td>
																	<td style={{ textAlign: 'left' }}>
																		{item4.lastname} {item4.firstname}{' '}
																	</td>
																	<td>{item4.birthday}</td>
																	<td> </td>
																	<td>{item4.team}</td>
																</tr>
															))}
													</tfoot>
												</table>
											)}
										</div>
									))}
							</div>
						)}
					</div>
				))}
			</>
		</div>
	)
}
