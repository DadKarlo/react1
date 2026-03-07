import { useState } from 'react'
import { API_site } from '../API_URL'

export default function Welcome(props) {
	const [showinstr, setShowinstr] = useState(true)
	const setinstr = () => setShowinstr((i) => !i)

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '1rem',
			}}
		>
			<h1>{!!props.enru ? 'Hello and Welcome ' : 'Добро пожаловать '}!</h1>
			<div
				style={{
					width: '70%',
					padding: '1px',
					border: '1px solid',
					borderRadius: '15px',
				}}
			>
				<h5 style={{ marginTop: '0.7rem' }}>
					{!!props.enru
						? 'Welcome to a convenient platform for swimming competitions!'
						: 'Вас приветствует платформа для проведения соревнований по плаванию! '}
				</h5>
				<h4 style={{ margin: '1rem' }}>
					{!!props.enru
						? 'Please read the instructions and rules for using the platform.'
						: 'Пожалуйста, ознакомьтесь с инструкцией и правилами пользования сайтом.'}
				</h4>
				<h5 style={{ marginBottom: '0.7rem' }}>
					{!!props.enru ? (
						<a
							style={{ textDecoration: 'none', color: 'black' }}
							href="https://t.me/swimsportru"
						>
							Questions and suggestions: t.me/swimsportru
						</a>
					) : (
						<a
							style={{ textDecoration: 'none', color: 'black' }}
							href="https://t.me/swimsportru"
						>
							Вопросы и предложения: t.me/swimsportru
						</a>
					)}
				</h5>
			</div>

			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '24rem',
				}}
				action={API_site + '/login'}
				method="post"
			>
				<input
					style={{
						padding: '5px',
						border: '1px solid',
						borderRadius: '5px',
						width: '100%',
						boxSizing: 'border-box',
						margin: '1rem',
					}}
					type="text"
					name="login"
					pattern="[A-Za-z]{10,110}"
					maxLength={110}
					title={'Введите от 10 до 100 английских симовлов!'}
					required
					placeholder={!!props.enru ? 'Login Name' : 'Введите название'}
				/>
				<button
					style={{
						padding: '3px',
						borderRadius: '5px',
						width: '40%',
						color: 'white',
						backgroundColor: 'blue',
						fontFamily: 'Arial',
						boxSizing: 'border-box',
						fontSize: '120%',
						cursor: 'pointer',
					}}
				>
					{!!props.enru ? 'Enter' : 'Вход'}
				</button>
				<button
					onClick={setinstr}
					type="button"
					style={{
						margin: '1rem',
						border: '1px',
						fontSize: '1rem',
						width: '50%',
						fontFamily: 'Arial',
						backgroundColor: 'white',
						textAlign: 'center',
					}}
				>
					{!!showinstr
						? !!props.enru
							? 'Instruction...'
							: 'Инструкция...'
						: !!props.enru
							? 'Close...'
							: 'Скрыть...'}
				</button>
				{!!showinstr ? <></> : <> </>}
			</form>
		</div>
	)
}
