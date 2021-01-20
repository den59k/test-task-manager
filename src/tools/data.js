import { GET, POST } from "./fetch"
import { validateEmail } from './validate'

export async function getTasks (state){

	const { sort_field, sort_direction, page } = state

	const data = await GET('/', { sort_field, sort_direction, page })
	
	return data.message
}


export async function addTask ({text, username, email}){
	if(!text) return { text: "Поле должно быть заполнено" }
	if(!username) return { username: "Имя пользователя должно быть заполнено" }
	if(!email || !validateEmail(email)) return { email: "Некорректный email" }

	const response = await POST('/create', { text, username, email })

	if(response.status === 'error') return response.message
}

export async function makeDone (id, done){
	const response = await POST('/edit/'+id, { status: done? 10: 0 })
	if(response.status === 'error') return response.message
}

export async function editTask (id, text){
	const response = await POST('/edit/'+id, { text })
	if(response.status === 'error') return response.message
}

export async function login ({username, password}){
	if(!username) return { username: "Поле должно быть заполнено!" }
	if(!password) return { password: "Пароль должен быть заполнен!" }

	const response = await POST('/login', { username, password })

	if(response.status === 'error') return response.message

	const { token } = response.message

	localStorage.setItem('token', token)
}

export async function logout (){
	localStorage.removeItem('token')
}