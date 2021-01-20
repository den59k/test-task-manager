import cn from 'classnames'
import { useContextMethods, useContextState } from 'context'
import { logout } from 'tools/data'

import styles from 'styles/app.module.sass'
import controlStyles from 'styles/controls.module.sass'

export default function Header(){

	const { mode, admin } = useContextState()
	const { changeMode, updateData } = useContextMethods()

	const onLogout = () => {
		logout()
		updateData()
	}

	if(admin)
		return (
			<div className={cn("container", styles.header)}>
				<div className={styles.sub}>Вы авторизованы</div>
				<button className={controlStyles.button} onClick={onLogout}>Выйти из аккаунта</button>
			</div>
		)

	return (
		<div className={cn("container", styles.header)}>
			<button className={controlStyles.button} onClick={() => changeMode('auth-form')}>
				Войти в аккаунт
			</button>
		</div>
	)
}