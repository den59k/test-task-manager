const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2'
const developer = 'den59k'

const urlExt = '?developer='+developer

export async function GET (url, params){

	const urlParams = new URLSearchParams()
	for(let key in params){
		if(params[key] !== null && params[key] !== undefined)
			urlParams.append(key, params[key])
	}

	const json = await fetch(baseUrl + url + urlExt + '&'+ urlParams.toString())
	const data = await json.json()

	return data
}

export async function POST (url, params, method='POST'){

	const body = new FormData()
	for(let key in params)
		body.append(key, params[key])

	if(localStorage.getItem('token'))
		body.append('token', localStorage.getItem('token'))

	const json = await fetch(baseUrl + url + urlExt, {
		method,
		body
	})

	const data = await json.json()

	return data
}