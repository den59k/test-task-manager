import cn from 'classnames'

import styles from 'styles/controls.module.sass'


export function Control ({error, children, className}){
	return (
		<div className={cn(styles.control, className, error && styles.errored)}>
			{children}
			{error && (
				<div className={styles.error}>{error}</div>
			)}
		</div>
	)
}

export function TextArea ({error, name, onChange, value, rows, placeholder}){

	const _onChange = (e) => {
		onChange({ [name]: e.currentTarget.value })
	}

	return (
		<Control error={error}>
			<textarea 
				name={name}
				onChange={_onChange} 
				value={value || ""} 
				className={cn(styles.textarea)}
				placeholder={placeholder}
				rows={rows || 1}
			/>
		</Control>
	)

}


export function Input ({error, name, onChange, value, className, placeholder, label}){

	const _onChange = (e) => {
		onChange({ [name]: e.currentTarget.value })
	}

	return (
		<Control className={cn(styles.inputWrapper, className)} error={error}>
			{label && <label>{label}</label> }
			<input name={name} onChange={_onChange} placeholder={placeholder} value={value || ""} />
		</Control>
	)
}