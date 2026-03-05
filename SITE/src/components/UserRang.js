import { useState } from 'react'
// переделать дети и взрослые
//enru={props.enru}
function UserRang(props) {
	const [sex, setSex] = useState('')
	const [group, setGroup] = useState('')
	const [category, setCategory] = useState('')

	const handleCangeSex = (e) => {
		setSex(e.target.value)
		props.sex(e.target.value)
	}
	const handleCangeGroup = (e) => {
		setGroup(e.target.value)
		props.group(e.target.value)
	}
	const handleCangeCategory = (e) => {
		setCategory(e.target.value)
		props.category(e.target.value)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<select
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
				value={sex}
				onChange={handleCangeSex}
			>
				<option value={!!props.enru ? `Man's` : 'Мужчины'}>
					{!!props.enru ? `Man's` : 'Мужчины'}
				</option>
				<option value={!!props.enru ? `Women's` : 'Женщины'}>
					{!!props.enru ? `Women's` : 'Женщины'}
				</option>
				<option value={!!props.enru ? `Girls` : 'Девушки'}>
					{!!props.enru ? `Girls` : 'Девушки'}
				</option>
				<option value={!!props.enru ? `Boys` : 'Юниоры'}>
					{!!props.enru ? `Boys` : 'Юниоры'}
				</option>
				<option value={!!props.enru ? `Other` : 'Другое'}>
					{!!props.enru ? `Other` : 'Другое'}
				</option>
			</select>
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
				name="category"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				value={category}
				onChange={handleCangeCategory}
				placeholder={!!props.enru ? 'Category *' : 'Категория *'}
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
				name="group"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				value={group}
				onChange={handleCangeGroup}
				placeholder={!!props.enru ? 'Group *' : 'Группа *'}
			/>
		</div>
	)
}
export default UserRang
