import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useImages } from '../hooks/useImages'
import { renderHook } from '@testing-library/react'

const testResponseData = { _id: 'testId', label: 'testLabel', imgUrl: 'testImgUrl' }

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') return reject('Not a string.')
		const testResponse = {
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(testResponseData)
				})
			},
		}
		resolve(testResponse)
	})
})
// beforeEach(() => {
// 	vi.spyOn(globalThis, 'fetch').mockImplementationOnce(testFetch)
// })
vi.stubGlobal('fetch', testFetch)

const { result } = renderHook(() => useImages())

it('useImages() should be a function', () => {
	expect(typeof useImages).toBe('function')
})
describe('getImages()', () => {
	it('useImages() must have a method called "getImages"', () => {
		expect(result.current.getImages).toBeTypeOf('function')
	})
})

describe('postImage()', () => {
	it('useImages() must have a method called "postImage', () => {
		expect(result.current.postImage).toBeTypeOf('function')
	})

	it('Should throw if in "label" provided is not a "string"', () => {
		expect(() => {
			result.current.postImage(2, 'testing imgUrl')
		}).toThrow(/Type should be a string./)
	})

	it('Should throw if in "imgUrl" provided is not a "string"', () => {
		expect(() => {
			result.current.postImage('testing label', 2)
		}).toThrow(/Type should be a string./)
	})

	it('Should return an object with propierties: "_id", "label" and "imgUrl", when success', async () => {
		// const resultTest = result.current.postImage('testing Label', 'testin imgUrl')
		const testData = {label: 'testig', imgUrl: 'image'}

		expect(result.current.postImage(testData)).resolves.toEqual(
			testResponseData
		)
	})

	/* 	it('Should throw in case of non-ok responses', async () => {
		testFetch.mockResolvedValueOnce({
			ok: false,
		})
		expect(() => result.current.postImage('testing Label', 'testin imgUrl')).toThrow(
			/Non-ok response/
		)
	}) */
	// BUSCAR OPCIONES PARA QUE RECHACE.

	/* 		testFetch.mockImplementationOnce((url, options) => {
			return new Promise((resolve, reject) => {
				const testResponse = {
					ok: false,
					json() {
						return new Promise((resolve, reject) => {
							resolve(testResponseData)
						})
					},
				}
				resolve(testResponse)
			})
		})
		expect(() => result.current.postImage('testLavel', 'testImgUrl')).toThrow() 
		// return expect(result.current.postImage('testLavel', 'testImgUrl')).rejects.toBeInstanceOf(Error)
				let errorMessage = null

		const postImageFn = async () => {
			try {
				result.current.postImage('testLavel', 'testImgUrl')
			} catch (err) {
				errorMessage(err)
			}
		}

		await postImageFn()
		expect(errorMessage).toBe('Non-ok response') */
})
