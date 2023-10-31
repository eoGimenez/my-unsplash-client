import { describe, expect, it } from 'vitest'
import { useSearch } from '../hooks/useSearch'
import { renderHook } from '@testing-library/react'

describe('useSearch()', () => {

	// const { result } = renderHook(() => useSearch())
	it('useSearch() must be a function', () => {
		expect(useSearch).toBeTypeOf('function')
	})
})
