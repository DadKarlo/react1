import { useEffect, useState } from 'react'
import GuestButton from './GuestButton'
import { API_site } from '../API_URL'

function Guest(props) {
	//sse подключить!!!
	const [data, setData] = useState([])

	useEffect(() => {
		if (data?.setup?.NameTitle) {
			if (data?.setup?.NameTitle !== ''.trim()) {
				document.title = `${data?.setup?.NameTitle}`
			}
		} else {
			document.title = 'Соревнования по плаванию | Competitive Swimming'
		}
	}, [data])

	useEffect(() => {
		//!!!
		const user = new URL(document.URL)
		const sse = new EventSource(API_site + `${user.pathname}`) //!!!SSE variant
		sse.onopen = () => {
			// console.log('onopen')
			props.sse(true)
		}
		sse.onmessage = async (e) => {
			const data = await JSON.parse(e.data)
			// console.log(data, 'sse')
			setData(data)
		}
		sse.onerror = (_err) => {
			props.sse(false)
			// console.log(err)
		}
		return () => {
			sse.close()
			props.sse(false)
			// console.log('close')
		}
	}, []) //!!!SSE

	return (
		<>
			<GuestButton data={data} enru={props.enru} />
		</>
	)
}

export default Guest
