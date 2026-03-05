import { useEffect, useState } from 'react'

export default function TdTimeStart(props) {
	//props.TimeStart  "TimeStart": "000000",

	const [timeS, setTimeS] = useState(props.item)
	useEffect(() => {
		setTimeS(props.item)
	}, [props])

	const MM = timeS?.TimeStart?.slice(0, 2)
	const SS = timeS?.TimeStart?.slice(2, 4)
	const MS = timeS?.TimeStart?.slice(4, 6)

	return <>{timeS ? `${MM}:${SS}.${MS}` : ''}</>
}
