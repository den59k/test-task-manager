import cn from 'classnames'
import { useContextState, useContextMethods } from "context"
import { makeDone, editTask, logout } from 'tools/data'
import styles from 'styles/tasks.module.sass'

import Pagination from './pagination'
import { IoIosCheckmark, IoMdArrowDropup, IoIosMore } from 'react-icons/io'
import { useEffect, useState } from 'react'

export default function Tasks (){

	const { data, page, mode, admin } = useContextState()
	const { changePage, updateData } = useContextMethods()

	if(!data || mode !== 'tasks') return null
	if(data.tasks.length === 0) return <h2 className="container">Здесь пока нет задач</h2>

	const onMakeDone = async (task_id, done) => {
		const res = await makeDone(task_id, done)
		if(typeof res === 'object' && res.token)	{
			alert("Вы не авторизованы")
			logout()
		}
		updateData() 
	}

	const onEdit = async (task_id, value) => {
		const edited_text = prompt("Введите новый текст", value)
		if(edited_text === '' || value === edited_text) return
		const res = await editTask (task_id, edited_text)
		
		if(typeof res === 'object' && res.token){
			alert("Вы не авторизованы")
			logout()
		}

		updateData()
	}

	return (
		<div className={styles.container}>
			<SortingFields/>
			<ul className={styles.list}>
				{data.tasks.map(task => <Task key={task.id} onEdit={onEdit} onMakeDone={onMakeDone} isAdmin={admin} task={task}/> )}
			</ul>
			<Pagination onChangePage={changePage} currentPage={page} count={data.total_task_count}/>
		</div>
	)
}

const sortingFields = {
	id: "Добавлена",
	email: "Email",
	username: "Имя пользователя",
	status: "Статус"
}


function SortingFields (){
	
	const { sort_field, sort_direction } = useContextState()
	const { changeSort } = useContextMethods()
	
	const onChangeSort = (key) => {
		if(key === sort_field)
			changeSort(key, sort_direction === 'desc'? 'asc': 'desc')
		else
			changeSort(key, 'asc')
	}
	
	return (
		<div className={styles.sortingFields}>
			{Object.keys(sortingFields).map(key => (
				<button onClick={() => onChangeSort(key)} key={key} className={cn(sort_field === key && styles.active)}>
					{sortingFields[key]}
					{sort_field === key && <IoMdArrowDropup className={cn(sort_direction === 'desc' && styles.desc)}/> }
				</button>
			))}
		</div>
	)
}

function Task ({task, onMakeDone, isAdmin, onEdit}){

	const done = task.status === 10

	const fields = { 
		done: done? 'Снять отметку "выполнено"': 'Поставить отметку "выполнено"',
		edit: "Редактировать текст"
	}

	const onMenuItemClick = (action) => {
		if(action === 'done') onMakeDone(task.id, !done)
		if(action === 'edit') onEdit (task.id, task.text)
	}

	return (
		<li key={task.id} className={cn(styles.task, done && styles.done)}>
			<div className={styles.taskInfo}>
				<div className={styles.text}>{task.text}</div>

				<div className={styles.author}>
					<div className={styles.username}>{task.username}</div>
					<div className={styles.email}>{task.email}</div>
				</div>
			</div>
			{ done && <IoIosCheckmark className={styles.check}/> }
			{ isAdmin && <MenuMore fields={fields} onClick={onMenuItemClick}/> }
		</li>
	)
}

function MenuMore ({fields, onClick}){

	const [ opened, setOpened ] = useState(false)

	useEffect(() => {
		if(opened)
			document.addEventListener('click', () => setOpened(false), { once: true })
	}, [opened])

	return (
		<div className={styles.more}>
			<button onClick={() => setOpened(true)}><IoIosMore/></button>
			{ opened && (
				<div className={styles.menu}>
					{Object.keys(fields).map(key => (
						<button key={key} onClick={() => onClick(key)}>{fields[key]}</button>
					))}
				</div>
			)}
		</div>
	)
}
