import { describe, expect, it } from 'vitest'
import { useSearch } from '../hooks/useSearch'
import { renderHook } from '@testing-library/react'

const testSearch = [
	{ _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' },
	{ _id: 'testId_2', label: 'testLabel_2', imgUrl: 'testImgUrl_2' },
	{ _id: 'testId_3', label: 'testLabel_3', imgUrl: 'testImgUrl_3' },
]
const { result } = renderHook(() => useSearch({ images: testSearch }))

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
			renderHook(() => useSearch({ images: [{ _id: 'testNoimgUrl', label: 'testNoimgUrl' }] }))
		).toThrow(/Error - One or more elements have not "imgUrl"/)
	})
})
