function FormCompetitionName(props) {
	const handleCangeNameCompitition = (e) => {
		props.setNameCompitition(e.target.value)
	}
	const handleCangeNameTitle = (e) => {
		props.setNameTitle(e.target.value)
	}
	const handleCangeInfo = (e) => {
		props.setInfo(e.target.value)
	}

	return (
		<>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					margin: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				value={props.NameCompitition}
				maxLength={100}
				onChange={handleCangeNameCompitition}
				name="NameCompitition"
				placeholder={
					!!props.enru ? 'Name of the Compitition' : 'Название соревновваний'
				}
			/>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				maxLength={100}
				value={props.NameTitle}
				onChange={handleCangeNameTitle}
				name="NameTitle"
				placeholder={!!props.enru ? 'Title page name' : 'Название сайта'}
			/>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				maxLength={100}
				value={props.Info}
				onChange={handleCangeInfo}
				name="Info"
				placeholder={!!props.enru ? 'Information' : 'Информация'}
			/>
		</>
	)
}

export default FormCompetitionName
