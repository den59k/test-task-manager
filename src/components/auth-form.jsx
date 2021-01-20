import { useState } from 'react'
import cn from 'classnames'
import { login } from 'tools/data'

import controlStyles from 'styles/controls.module.sass'
import styles from 'styles/form.module.sass'

import { Input } from "./controls";
import { useContextMethods, useContextState } from 'context';

export default function AuthForm (){

	const { mode } = useContextState()
	const { changeMode, updateData } = useContextMethods()

	const [ values, setValues ] = useState({})
	const [ errors, setErrors ] = useState({})

	if(mode !== 'auth-form') return null

	const onChange = (obj) => {
		setValues({ ...values, ...obj })
	}

	const onSubmit = async () => {
		const res = await login(values)
		if(typeof res === 'object') return setErrors(res)
		setErrors({})
		updateData()
		changeMode('tasks')
	}

	return (
		<div className={cn("container", styles.container, styles.auth)}>
			<h2>Авторизация в аккаунте</h2>
			<Input 
				error={errors.username} 
				className={controlStyles.filled} 
				name="username" 
				onChange={onChange} 
				value={values.username} 
				placeholder="Логин"
			/>
			<Input 
				error={errors.password} 
				className={controlStyles.filled} 
				name="password" 
				onChange={onChange} 
				value={values.password} 
				placeholder="Пароль"
			/>
			<button className={styles.submit} onClick={onSubmit}>Войти в аккаунт</button>
			<button className={controlStyles.button} onClick={() => changeMode('tasks')}>Вернуться назад</button>
		</div>
	)
}