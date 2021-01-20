import React, { createContext, useContext, useEffect, useState } from 'react'
import initState from './init'
import { useUpdatingData } from './hooks'

const Context = createContext()

export function Provider ({ children }){

	const [ state, setState ] = useState(() => initState())
	
	useUpdatingData(state, data => setState( state => ({...state, data}) ))

	const changePage = (page) => setState(state => ({ ...state, page }) )
	const changeSort = (sort_field, sort_direction) => setState(state => ({ ...state, sort_field, sort_direction }))
	const changeMode = (mode) => setState(state => ({...state, mode}))
	const updateData = () => {
		const admin = !!localStorage.getItem('token')
		setState(state => ({ ...state, mutateFlag: !state.mutateFlag, admin }))
	}
	
	return (
		<Context.Provider value={{ state, methods: { changePage, changeSort, changeMode, updateData } }}>
			{ children }
		</Context.Provider>
	)
}

export function useContextState () {
	const { state } = useContext(Context)
	return state
}

export function useContextMethods (){
	const { methods } = useContext(Context)
	return methods
}