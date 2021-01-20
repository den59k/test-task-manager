export default function initState () {
	
	return {
		mode: 'tasks',
		data: null,
		sort_field : 'id',
		sort_direction: 'desc',
		page: 1,
		mutateFlag: false,
		admin: !!localStorage.getItem('token')
	}
}
