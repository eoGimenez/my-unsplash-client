import { describe, expect, it } from 'vitest'
import { useSwitch } from '../../hooks/useSwitch'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('useSwitch()', () => {
	it('Should be a function', () => {
		expect(useSwitch).toBeTypeOf('function')
	})

	it('Should yield an objecti with the "isTrue" propierty', () => {
		const { result } = renderHook(() => useSwitch())

		expect(result.current.isTrue).toBeDefined()
	})

	it('Should yield an objecti with the "switchBool" propierty', () => {
		const { result } = renderHook(() => useSwitch())

		expect(result.current.switchBool).toBeDefined()
	})

	it('When the custom hook is called, "isTrue" must be setted in "false"', () => {
		const { result } = renderHook(() => useSwitch())

		expect(result.current.isTrue).toEqual(false)
	})

	it('Should toggle the "isTrue" value when "switchBool()" is called.', () => {
		const { result } = renderHook(() => useSwitch())

		act(() => {
			result.current.switchBool()
		})

		expect(result.current.isTrue).toEqual(true)
	})
})
