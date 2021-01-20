import { useEffect } from 'react'
import { getTasks } from 'tools/data'

export function useUpdatingData (state, callback){

	const { sort_field, sort_direction, page, mutateFlag } = state
	
	useEffect(() => {

		getTasks( { sort_field, sort_direction, page } ).then(callback)
	}, [ sort_field, sort_direction, page, mutateFlag ])

}
