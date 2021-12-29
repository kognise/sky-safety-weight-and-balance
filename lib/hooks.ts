import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useLocalState = <Type>(
	key: string,
	defaultValue: Type
): [Type, Dispatch<SetStateAction<Type>>] => {
	const [ state, setState ] = useState<Type>(defaultValue)

	useEffect(() => {
		const stored = localStorage.getItem(key)
		if (stored) setState(JSON.parse(stored))
	}, [ key ])

	useEffect(() => {
		if (!state) return
		localStorage.setItem(key, JSON.stringify(state))
	}, [ key, state ])

	return [ state, setState ]
}
