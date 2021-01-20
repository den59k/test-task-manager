import cn from 'classnames'

import styles from 'styles/tasks.module.sass'

const maxPages = 13

export default function Pagination ({currentPage, count, onChangePage}){
	
	const pageCount = Math.min(Math.ceil(count / 3), maxPages)
	
	if(pageCount <= 1) return null

	const paginationData = []
	for(let i = 1; i <= pageCount; i++)
		paginationData.push({page: i, active: i === currentPage})

	return (
		<div className={styles.pagination}>
			{paginationData.map(item => (
				<button onClick={() => onChangePage(item.page)} key={item.page} className={cn(item.active && styles.active)}>
					{item.page}
				</button>
			))}
		</div>
	)
	
}