import { describe, expect, it } from 'vitest'
import { useSearch } from '../../hooks/useSearch'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

const testSearch = [
	{ _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' },
	{ _id: 'testId_2', label: 'testLabel_2', imgUrl: 'testImgUrl_2' },
	{ _id: 'testId_3', label: 'testLabel_3', imgUrl: 'testImgUrl_3' },
	{ _id: 'testId_4', label: 'aa', imgUrl: 'testImgUrl_4' },
]

describe('useSearch()', () => {
	it('useSearch() must be a function', () => {
		expect(useSearch).toBeTypeOf('function')
	})

	it('Should throw if dont provide any parameter', () => {
		expect(() => useSearch()).toThrow(
			/Cannot destructure property 'images' of 'undefined' as it is undefined./
		)
	})

	it('Should throw if not provide an array as parameter', () => {
		expect(() => renderHook(() => useSearch({ images: 'testSearch' }))).toThrow(
			/Object provided is not correct - useSearch/
		)
	})

	it('Should throw if object provided have not "_id" propierty', () => {
		expect(() =>
			renderHook(() => useSearch({ images: [{ label: 'testNoId', imgUrl: 'testNoId' }] }))
		).toThrow(/Error - One or more elements have not "_id"/)
	})

	it('Should throw if object provided have not "label" propierty', () => {
		expect(() =>
			renderHook(() => useSearch({ images: [{ _id: 'testNoLabel', imgUrl: 'testNoLabel' }] }))
		).toThrow(/Error - One or more elements have not "label"/)
	})

	it('Should throw if object provided have not "imgUrl" propierty', () => {
		expect(() =>
			renderHook(() =>
				useSearch({ images: [{ _id: 'testNoimgUrl', label: 'testNoimgUrl' }] })
			)
		).toThrow(/Error - One or more elements have not "imgUrl"/)
	})

	it('Should yield an object with the following propierties: "type", "value", "onChange" and "searched"', () => {
		const { result } = renderHook(() => useSearch({ images: testSearch }))

		expect(result.current.type).toBeDefined()
		expect(result.current.value).toBeDefined()
		expect(result.current.onChange).toBeDefined()
		expect(result.current.searched).toBeDefined()
	})

	it('Should return a "searched" object when probide a valid query equal to some "label"', async () => {
		const { result } = renderHook(() => useSearch({ images: testSearch }))

		const newQuery = 'testLabel_3'

		act(() => {
			result.current.onChange({ target: { value: newQuery } })
		})

		expect(result.current.value).toBe(newQuery.toLocaleLowerCase())
		expect(result.current.searched).toEqual([testSearch[2]])
	})

	it('Should throw if "value" provided is not a string', () => {
		const { result } = renderHook(() => useSearch({ images: testSearch }))

		const newQuery = 2

		expect(() => result.current.onChange({ target: { value: newQuery } })).toThrow(
			/Error - Value must be a string/
		)
	})
})
