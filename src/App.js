import { useContextState } from 'context'
import styles from 'styles/app.module.sass'

import Header from './components/header'
import Tasks from './components/tasks'
import NewTaskForm from './components/new-task-form'
import AuthForm from './components/auth-form'

export default function App (){
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header/>
				<AuthForm/>
				<NewTaskForm/>
				<Tasks/>
			</div>
		</div>
	)
}
