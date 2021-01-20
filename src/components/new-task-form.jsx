import { useState } from 'react'
import { addTask } from 'tools/data'

import controlStyles from 'styles/controls.module.sass'
import styles from 'styles/form.module.sass'

import { TextArea, Input } from 'components/controls'
import { useContextMethods, useContextState } from 'context'

export default function NewTaskForm (){

	const { mode } = useContextState()
	const { changeMode, updateData } = useContextMethods()

	const [ values, setValues ] = useState({})
	const [ errors, setErrors ] = useState({})

	const onChange = (obj) => {
		if('text' in obj) changeMode(obj.text === ''?'tasks': 'new-task')		
		
		setValues({...values, ...obj })
	}

	const clearText = () => onChange({text: ""})

	const onSubmit = async () => {
		const res = await addTask(values)
		if(typeof res === 'object') return setErrors(res)
		setErrors({})
		clearText()
		updateData()
	}

	if(mode ===  'tasks')
		return (
			<div className={styles.container}>
				<TextArea name="text" value={values.text} onChange={onChange} placeholder={"Добавить задачу..."} />
			</div>
		)

	if(mode === 'new-task'){
		return (
			<div className={styles.container}>
				<TextArea error={errors.text} rows={5} name="text" value={values.text} onChange={onChange} placeholder={"Добавить задачу..."} />
				<Input error={errors.username} name="username" value={values.username} onChange={onChange} label="Имя" placeholder="Ваше имя" />
				<Input error={errors.email} name="email" value={values.email} onChange={onChange} label="Email" placeholder="Ваш email" />
				
				<button className={styles.submit} onClick={onSubmit}>Добавить задачу</button>
				<button onClick={clearText} className={controlStyles.button}>Вернуться назад</button>
			</div>
		)
	}

	return null
}