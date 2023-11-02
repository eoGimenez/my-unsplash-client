import { useField } from '../hooks/useField'
import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'

describe('useField()', () => {
	const testField = { type: 'text', field: 'test value' }

	const { result } = renderHook(() => useField(testField))

	it('Should be a function', () => {
		expect(typeof useField).toBe('function')
	})

	it('Should throw if you dont provide any parameter', () => {
		expect(() => useField()).toThrow()
	})

	it('Should throw a specific error message if not string is provided in "type" parameter', () => {
		expect(() => useField({ type: 2 })).toThrow(/Type should be a string./)
	})

	it('Should yield an object with the "type" propierty', () => {
		expect(result.current.type).toBe('text')
	})

	it('Should yield an object with the "value" propierty with the value provided', () => {
		expect(result.current.value).toBe(testField.field)
	})

	it('Should yield an object with the "onChange" method', () => {
		expect(result.current.onChange).toBeTypeOf('function')
	})

	it('Should call method "onChange" to change the "value" propierty', () => {
		result.current.value = 'This is the new value'
		
		expect(result.current.value).toBe('This is the new value')
		expect(result.current.value).not.toBe(testField.field)
	})
})
