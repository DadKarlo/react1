const express = require('express')
const { randomUUID } = require('crypto')
const app = express()
const cors = require('cors')

app.use(cors())
const sport = require('./structure.json')

app.use(express.urlencoded({ extended: true })) //!!! обработка формы ОБЯЗАТЕЛЬНО!!!
app.use(express.json()) //!!! обязательно для body запроса !!!
const API = '/apidimon08041996reostat12'
const APIALL = 'http://localhost:5000/apidimon08041996reostat12'
const prodaction = 'https://swim-start.ru/'
const port = process.env.PORT || 5000

// Сообщение о том, что сервер запущен и прослушивает указанный порт
app.listen(port, () => console.log(`Listening on port ${port}`))

//start
app.get(API, (_, res) => {
	res.set('Content-Type', 'application/json')
	res.set('Accept', 'application/json')
	res.send(sport)
})
//welcome
app.post('/login', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const login = req?.body?.login
	const user = sport.find((i) => i.login === login)

	// console.log(login)
	// console.log(sport.length)
	if (user) {
		// console.log('get')
		res.set('Content-Type', 'application/json')
		res.set('Accept', 'application/json')
		res.redirect(prodaction + `${login}`)
		// res.send(sport.find((i) => i.login === login))
	} else {
		sport.push({
			login: login,
			setup: {
				timeReg: Date.now(),
				URLCLIENT: sport.length,
				NameCompitition: 'Название ваших соревнований по плаванию.',
				NameTitle: 'Соревнования по плаванию | Competitive Swimming',
				Info: 'Дополнительная информация при необходимости.',
				Lines: '1',
				ShowDate: 'true',
				ShowTeam: 'true',
				ShowTime: 'true',
				UseGroup: 'true',
				UseCategory: 'true',
				UseUpRung: 'true',
				DistancePosition: [],
			},
			sportsmens: [],
		})
		// console.log('post')
		res.set('Content-Type', 'application/json')
		res.set('Accept', 'application/json')
		res.redirect(prodaction + `${login}`)
		// res.send(sport.find((i) => i.login === login))
	}
})
//sse in??interval??
app.get('/:user', async (req, res) => {
	const user = req.params.user
	const que = await fetch(APIALL)
	const data = await que.json()

	if (isNaN(user)) {
		const use = await data.find((i) => i.login === user)
		if (use) {
			//prettier-ignore
			res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

			const interval = setInterval(async () => {
				const que = await fetch(APIALL)
				const data = await que.json()
				const use = await data.find((i) => i.login === user)
				use.login = randomUUID()
				res.write(`data: ${JSON.stringify(use)}\n\n`) //index!!!
			}, 5000)

			req.on('close', () => clearInterval(interval))
		} else {
			res.send(`${user} Not Found!`)
		}
	} else {
		if (data[user]) {
			//prettier-ignore
			res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})
			const interval1 = setInterval(async () => {
				const que = await fetch(APIALL)
				const data = await que.json()
				const use = await data[user]
				use.login = randomUUID()
				res.write(`data: ${JSON.stringify(use)}\n\n`) //index!!!
			}, 5000)

			req.on('close', () => clearInterval(interval1))
		} else {
			res.send(`${user} Not Found!`)
		}
	}
})
//form setup
app.post('/setupswim', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (id === undefined) {
		return res.status(400).json({ error: 'Error 400' })
	} else {
		if (client.NameCompitition !== '') {
			user.setup.NameCompitition = client.NameCompitition
		} //NameCompitition
		if (client.NameTitle !== '') {
			user.setup.NameTitle = client.NameTitle
		} //NameTitle
		if (client.Info !== '') {
			user.setup.Info = client.Info
		} //Info
		if (client.ShowDate !== undefined) {
			user.setup.ShowDate = client.ShowDate
		} //ShowDate bool
		if (client.ShowTeam !== undefined) {
			user.setup.ShowTeam = client.ShowTeam
		} //ShowTeam bool
		if (client.ShowTime !== undefined) {
			user.setup.ShowTime = client.ShowTime
		} //ShowTime bool
	}

	// console.log(client)

	res.status(201).json({ message: 'OK' })
}) //Name, Title, Info
app.post('/deldoubl', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const user = sport.find((i) => i.login === id)

	const i = user?.sportsmens.filter(
		(person, index, self) =>
			index ===
			self.findIndex(
				(p) =>
					p.firstname === person.firstname &&
					p.lastname === person.lastname &&
					p.birthday === person.birthday &&
					p.team === person.team &&
					p.sex === person.sex &&
					p.group === person.group &&
					p.category === person.category &&
					p.distance === person.distance,
			),
	) //сборка уникальных элементов sportsmens[]
	user?.sportsmens.splice(0, user?.sportsmens.length, ...i) //сохранение уникальных элементов sportsmens[]

	res.status(201).json({ message: 'OK' })
})

app.post('/setuproad', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (id === undefined) {
		return res.status(400).json({ error: 'Error 400' })
	} else {
		if (client.Lines !== undefined) {
			user.setup.Lines = client.Lines
		}
	}

	// console.log(user)
	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //Lines
app.post('/setupgro', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (id === undefined) {
		return res.status(400).json({ error: 'Error 400' })
	} else {
		if (client.UseGroup !== undefined) {
			user.setup.UseGroup = client.UseGroup
		}
	}
	// console.log(user)
	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //UseGroup
app.post('/setupcat', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (id === undefined) {
		return res.status(400).json({ error: 'Error 400' })
	} else {
		if (client.UseCategory !== undefined) {
			user.setup.UseCategory = client.UseCategory
		}
	}

	// console.log(user)
	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //UseCategory
app.post('/setupupru', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (id === undefined) {
		return res.status(400).json({ error: 'Error 400' })
	} else {
		if (client.UseUpRung !== undefined) {
			user.setup.UseUpRung = client.UseUpRung
		}
	}

	// console.log(user)
	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //UseUpRung
app.post('/setname', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	const swimmer = user.sportsmens.find((i) => i.id === client.swimmer)

	if (!swimmer) return res.status(400).json({ error: 'Error 400' })
	// if (!client.team) {}
	if (client.team) {
		swimmer.team = client.team
	} else {
		swimmer.lastname = client.lastname
		swimmer.firstname = client.firstname
	}

	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //Set User Name and Team

app.post('/setpoz', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	const swimmer = user.sportsmens.find((i) => i.id === client.swimmer)

	if (!swimmer) return res.status(400).json({ error: 'Error 400' })
	if (!isNaN(client.setidr) && !isNaN(client.setidz)) {
		swimmer.idr = Number(client.setidr)
		swimmer.idz = Number(client.setidz)
	}
	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //Set idz && idr

app.post('/timefin', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	const swimmer = user.sportsmens.find((i) => i.id === client.swimmer)

	if (!swimmer) return res.status(400).json({ error: 'Error 400' })
	if (!isNaN(client.TimeFinish)) {
		swimmer.TimeFinish = client.TimeFinish
	}

	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //set user swimmer time Finish

app.post('/setswim', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	const swimmer = user.sportsmens.find((i) => i.id === client.idUser)

	if (!swimmer) return res.status(400).json({ error: 'Error 400' })
	if (client.TimeFinishEmpty === 1) {
		swimmer.TimeFinish = ''
	}
	if (client.TimeFinishDSQ === 1) {
		swimmer.TimeFinish = 'DSQ'
	}
	if (client.TimeFinishDNQ) {
		swimmer.TimeFinish = 'DNS'
	}

	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //set user swimmer time Finish

app.post('/delswim', async (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	const swimmer = user.sportsmens.find((i) => i.id === client.idUser)

	if (!swimmer) return res.status(400).json({ error: 'Error 400' })

	const q = { ...swimmer }

	const swimID = user.sportsmens.findIndex(
		(swimm) => swimm.id === client.idUser,
	)
	if (swimID !== -1) {
		user.sportsmens.splice(swimID, 1)
	}

	const delpoz = user.sportsmens.findIndex(
		(swim) =>
			swim.distance === q.distance &&
			swim.sex === q.sex &&
			swim.category === q.category &&
			swim.group === q.group,
	)
	if (delpoz === -1) {
		const del = user.setup.DistancePosition.findIndex(
			(swim) =>
				swim.distance === q.distance &&
				swim.sex === q.sex &&
				swim.category === q.category &&
				swim.group === q.group,
		)
		user.setup.DistancePosition.splice(del, 1)
	}

	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //delite userswim

app.post('/adduser', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)

	if (user) {
		user.sportsmens.push({
			id: randomUUID(),
			firstname: client.firstname,
			lastname: client.lastname,
			birthday: client.birthday,
			team: client.team,
			sex: client.sex,
			group: client.group,
			category: client.category,
			distance: client.distance,
			TimeStart: client.TimeStart,
			TimeFinish: client.TimeFinish,
			ids: client.ids,
			idr: Number(client.idr),
			idz: Number(client.idz),
		})
	}

	// console.log(client)
	res.status(201).json({ message: 'OK' })
}) //Set User Name and Team

app.post('/usesport', (req, res) => {
	if (!req.body) return res.status(400).json({ error: 'Error 400' })
	const id = req?.body?.id
	const client = req?.body
	const user = sport.find((i) => i.login === id)
	//massiv DistancePosition =? unik => dellite !== => unik dellite coppy => DistancePosition + -unik => write

	const setupLines = [1]
	if (user?.setup?.Lines === '2') {
		const lin = [1, 2]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 2 дорожки в заплыве
	if (user?.setup?.Lines === '3') {
		const lin = [2, 1, 3]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 3 дорожки в заплыве
	if (user?.setup?.Lines === '4') {
		const lin = [2, 3, 1, 4]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 4 дорожки в заплыве
	if (user?.setup?.Lines === '5') {
		const lin = [3, 2, 4, 1, 5]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 5 дорожек в заплыве
	if (user?.setup?.Lines === '6') {
		const lin = [3, 4, 2, 5, 1, 6]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 6 дорожек в заплыве
	if (user?.setup?.Lines === '7') {
		const lin = [4, 3, 5, 2, 6, 1, 7]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 7 дорожек в заплыве
	if (user?.setup?.Lines === '8') {
		const lin = [4, 5, 3, 6, 2, 7, 1, 8]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 8 дорожек в заплыве
	if (user?.setup?.Lines === '9') {
		const lin = [5, 4, 6, 3, 7, 2, 8, 1, 9]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 9 дорожек в заплыве
	if (user?.setup?.Lines === '10') {
		const lin = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9]
		setupLines.splice(0, setupLines.length, ...lin)
	} // 10 дорожек в заплыве

	if (client.idstart && client.idfinish) {
		const ind = user?.setup?.DistancePosition.findIndex(
			(i) => i.id === client.idstart,
		)

		const toind = Number(client.idfinish) - 1
		const indEl = user?.setup?.DistancePosition.splice(ind, 1)[0]
		user?.setup?.DistancePosition.splice(toind, 0, indEl)
	} // установка порядка дистанция в заплывах!!!

	if (
		client.addist1 ||
		client.addist2 ||
		client.addist3 ||
		client.addistOther
	) {
		if (client.addist1 !== '') {
			user.sportsmens.push({
				id: randomUUID(),
				firstname: client.firstname,
				lastname: client.lastname,
				birthday: client.birthday,
				team: client.team,
				sex: client.sex,
				group: client.group,
				category: client.category,
				distance: client.addist1,
				TimeStart: client.time1,
				TimeFinish: '',
			})
		} //1 push
		if (client.addist2 !== '') {
			user.sportsmens.push({
				id: randomUUID(),
				firstname: client.firstname,
				lastname: client.lastname,
				birthday: client.birthday,
				team: client.team,
				sex: client.sex,
				group: client.group,
				category: client.category,
				distance: client.addist2,
				TimeStart: client.time2,
				TimeFinish: '',
			})
		} //2 push
		if (client.addist3 !== '') {
			user.sportsmens.push({
				id: randomUUID(),
				firstname: client.firstname,
				lastname: client.lastname,
				birthday: client.birthday,
				team: client.team,
				sex: client.sex,
				group: client.group,
				category: client.category,
				distance: client.addist3,
				TimeStart: client.time3,
				TimeFinish: '',
			})
		} //3 push
		if (client.addistOther !== '') {
			user.sportsmens.push({
				id: randomUUID(),
				firstname: client.firstname,
				lastname: client.lastname,
				birthday: client.birthday,
				team: client.team,
				sex: client.sex,
				group: client.group,
				category: client.category,
				distance: client.addistOther,
				TimeStart: client.timeOther,
				TimeFinish: '',
			})
		} //Other
	} //Дистанция...

	if (user?.setup?.UseCategory === 'true' && user?.setup?.UseGroup !== 'true') {
		// console.log('UseCategory OK')

		const unik1 = user?.setup?.DistancePosition.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.category === person.category,
				),
		) //сборка уникальных элементов клиента
		const unik2 = user.sportsmens.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.category === person.category,
				),
		) //поиск уникальных заплывов (пол, дистанция)

		const resUnik = unik2.filter(
			(e) =>
				!unik1.some(
					(o) =>
						o.distance === e.distance &&
						o.sex === e.sex &&
						o.category === e.category,
				),
		)

		const unik = [...unik1, ...resUnik]
		//поиск уникальных заплывов (пол, дистанция)
		user?.setup?.DistancePosition.splice(
			0,
			user?.setup?.DistancePosition.length,
			...unik,
		)

		for (let i = 0; i < user?.setup?.DistancePosition.length; i++) {
			const elementI = user?.setup?.DistancePosition[i]

			for (let y = 0; y < user.sportsmens.length; y++) {
				const elementY = user.sportsmens[y]
				if (
					elementI.distance === elementY.distance &&
					elementI.sex === elementY.sex &&
					elementI.category === elementY.category
				) {
					user.sportsmens[y].ids = i + 1
				}
			} //номерация дистанций ids
		}

		const roadsADD = (arr, size) =>
			Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
				arr.slice(index * size, index * size + size),
			) //установка заплывов

		const linesClient = Number(user?.setup?.Lines) //количество дорожек

		for (let i = 0; i < unik.length; i++) {
			const zapliv = user.sportsmens.filter((u) => u.ids === i + 1)

			zapliv.sort((a, d) => Number(a.TimeStart) - Number(d.TimeStart))
			//sorted

			const rung = roadsADD(zapliv, linesClient)

			if (user.setup.UseUpRung === 'true') {
				rung.reverse()
			} //pozishn render

			for (let z = 0; z < rung.length; z++) {
				for (let r = 0; r < rung[z].length; r++) {
					if (user.sportsmens.find((i) => i.id === rung[z][r].id)) {
						user.sportsmens.find((i) => i.id === rung[z][r].id).idz = z + 1 // номерация заплывов idz

						user.sportsmens.find((i) => i.id === rung[z][r].id).idr =
							setupLines[r] //номерация дорожки idr
					}
				}
			}
		} // номерация дистанций ids номерация заплывов idz номерация дорожки idr
	} //UseCategory

	if (user?.setup?.UseGroup === 'true' && user?.setup?.UseCategory !== 'true') {
		// console.log('UseGroup OK')

		const unik1 = user?.setup?.DistancePosition.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.group === person.group,
				),
		) //сборка уникальных элементов клиента
		const unik2 = user.sportsmens.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.group === person.group,
				),
		) //поиск уникальных заплывов (пол, дистанция)

		const resUnik = unik2.filter(
			(e) =>
				!unik1.some(
					(o) =>
						o.distance === e.distance && o.sex === e.sex && o.group === e.group,
				),
		)

		const unik = [...unik1, ...resUnik]
		//поиск уникальных заплывов (пол, дистанция)
		user?.setup?.DistancePosition.splice(
			0,
			user?.setup?.DistancePosition.length,
			...unik,
		)

		for (let i = 0; i < user?.setup?.DistancePosition.length; i++) {
			const elementI = user?.setup?.DistancePosition[i]

			for (let y = 0; y < user.sportsmens.length; y++) {
				const elementY = user.sportsmens[y]
				if (
					elementI.distance === elementY.distance &&
					elementI.sex === elementY.sex &&
					elementI.group === elementY.group
				) {
					user.sportsmens[y].ids = i + 1
				}
			} //номерация дистанций ids
		}

		const roadsADD = (arr, size) =>
			Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
				arr.slice(index * size, index * size + size),
			) //установка заплывов

		const linesClient = Number(user?.setup?.Lines) //количество дорожек

		for (let i = 0; i < unik.length; i++) {
			const zapliv = user.sportsmens.filter((u) => u.ids === i + 1)

			zapliv.sort((a, d) => Number(a.TimeStart) - Number(d.TimeStart))
			//sorted

			const rung = roadsADD(zapliv, linesClient)

			if (user.setup.UseUpRung === 'true') {
				rung.reverse()
			} //pozishn render

			for (let z = 0; z < rung.length; z++) {
				for (let r = 0; r < rung[z].length; r++) {
					if (user.sportsmens.find((i) => i.id === rung[z][r].id)) {
						user.sportsmens.find((i) => i.id === rung[z][r].id).idz = z + 1 // номерация заплывов idz

						user.sportsmens.find((i) => i.id === rung[z][r].id).idr =
							setupLines[r] //номерация дорожки idr
					}
				}
			}
		} // номерация дистанций ids номерация заплывов idz номерация дорожки idr
	} //UseGroup

	if (user?.setup?.UseGroup === 'true' && user?.setup?.UseCategory === 'true') {
		// console.log('UseGroup && UseCategory OK')

		const unik1 = user?.setup?.DistancePosition.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.group === person.group &&
						p.category === person.category,
				),
		) //сборка уникальных элементов клиента
		const unik2 = user.sportsmens.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) =>
						p.distance === person.distance &&
						p.sex === person.sex &&
						p.group === person.group &&
						p.category === person.category,
				),
		) //поиск уникальных заплывов (пол, дистанция)

		const resUnik = unik2.filter(
			(e) =>
				!unik1.some(
					(o) =>
						o.distance === e.distance &&
						o.sex === e.sex &&
						o.group === e.group &&
						o.category === e.category,
				),
		)

		const unik = [...unik1, ...resUnik]
		//поиск уникальных заплывов (пол, дистанция)
		user?.setup?.DistancePosition.splice(
			0,
			user?.setup?.DistancePosition.length,
			...unik,
		)

		for (let i = 0; i < user?.setup?.DistancePosition.length; i++) {
			const elementI = user?.setup?.DistancePosition[i]

			for (let y = 0; y < user.sportsmens.length; y++) {
				const elementY = user.sportsmens[y]
				if (
					elementI.distance === elementY.distance &&
					elementI.sex === elementY.sex &&
					elementI.group === elementY.group &&
					elementI.category === elementY.category
				) {
					user.sportsmens[y].ids = i + 1
				}
			} //номерация дистанций ids
		}

		const roadsADD = (arr, size) =>
			Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
				arr.slice(index * size, index * size + size),
			) //установка заплывов

		const linesClient = Number(user?.setup?.Lines) //количество дорожек

		for (let i = 0; i < unik.length; i++) {
			const zapliv = user.sportsmens.filter((u) => u.ids === i + 1)

			zapliv.sort((a, d) => Number(a.TimeStart) - Number(d.TimeStart))
			//sorted

			const rung = roadsADD(zapliv, linesClient)

			if (user.setup.UseUpRung === 'true') {
				rung.reverse()
			} //pozishn render

			for (let z = 0; z < rung.length; z++) {
				for (let r = 0; r < rung[z].length; r++) {
					if (user.sportsmens.find((i) => i.id === rung[z][r].id)) {
						user.sportsmens.find((i) => i.id === rung[z][r].id).idz = z + 1 // номерация заплывов idz

						user.sportsmens.find((i) => i.id === rung[z][r].id).idr =
							setupLines[r] //номерация дорожки idr
					}
				}
			}
		} // номерация дистанций ids номерация заплывов idz номерация дорожки idr
	} //UseGroup && UseCategory

	if (user?.setup?.UseGroup !== 'true' && user?.setup?.UseCategory !== 'true') {
		// console.log('Only sex && distants')

		const unik1 = user?.setup?.DistancePosition.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) => p.distance === person.distance && p.sex === person.sex,
				),
		) //сборка уникальных элементов клиента
		const unik2 = user.sportsmens.filter(
			(person, index, self) =>
				index ===
				self.findIndex(
					(p) => p.distance === person.distance && p.sex === person.sex,
				),
		) //поиск уникальных заплывов (пол, дистанция)

		const resUnik = unik2.filter(
			(e) => !unik1.some((o) => o.distance === e.distance && o.sex === e.sex),
		)

		const unik = [...unik1, ...resUnik]
		//поиск уникальных заплывов (пол, дистанция)
		user?.setup?.DistancePosition.splice(
			0,
			user?.setup?.DistancePosition.length,
			...unik,
		)

		for (let i = 0; i < user?.setup?.DistancePosition.length; i++) {
			const elementI = user?.setup?.DistancePosition[i]

			for (let y = 0; y < user.sportsmens.length; y++) {
				const elementY = user.sportsmens[y]
				if (
					elementI.distance === elementY.distance &&
					elementI.sex === elementY.sex
				) {
					user.sportsmens[y].ids = i + 1
				}
			} //номерация дистанций ids
		}

		const roadsADD = (arr, size) =>
			Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
				arr.slice(index * size, index * size + size),
			) //установка заплывов

		const linesClient = Number(user?.setup?.Lines) //количество дорожек

		for (let i = 0; i < unik.length; i++) {
			const zapliv = user.sportsmens.filter((u) => u.ids === i + 1)

			zapliv.sort((a, d) => Number(a.TimeStart) - Number(d.TimeStart))
			//sorted

			const rung = roadsADD(zapliv, linesClient)

			if (user.setup.UseUpRung === 'true') {
				rung.reverse()
			} //pozishn render

			for (let z = 0; z < rung.length; z++) {
				for (let r = 0; r < rung[z].length; r++) {
					if (user.sportsmens.find((i) => i.id === rung[z][r].id)) {
						user.sportsmens.find((i) => i.id === rung[z][r].id).idz = z + 1 // номерация заплывов idz

						user.sportsmens.find((i) => i.id === rung[z][r].id).idr =
							setupLines[r] //номерация дорожки idr
					}
				}
			}
		} // номерация дистанций ids номерация заплывов idz номерация дорожки idr
	} // Only distants //sorted!!!

	// console.log(client)

	res.status(201).json({ message: 'OK' })
})
////Последняя обработка post
app.post('/:web', async (req, res) => {
	const web = req.params.web

	if (isNaN(web) && web.length < 10) {
		res.send(undefined)
	}

	const reqest = await fetch(APIALL) //sse?
	const data = await reqest.json() //t.text()

	if (!isNaN(web) && web < data.length) {
		try {
			data[web].login = randomUUID()
			res.send(data[web])
		} catch (error) {
			console.log(error)
		}
	}

	const user = await data.find((i) => i.login === web)
	if (user) {
		try {
			user.login = randomUUID()
			res.send(user)
		} catch (error) {
			console.log(error)
		}
	} else {
		res.send(undefined)
	}
})

// //ssl
// const option = {
// 	key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
// 	cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
// }

// //https
// const server = https.createServer(option, app)
// server.listen(443, () => {
// 	console.log('https server start')
// })
