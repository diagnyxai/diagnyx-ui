import { cn } from '../utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'not-included'))
        .toBe('base conditional')
    })

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'valid')).toBe('base valid')
    })

    it('should handle arrays of classes', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
    })

    it('should deduplicate classes with tailwind-merge', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })

    it('should handle objects with conditional classes', () => {
      expect(cn({
        'base-class': true,
        'conditional-class': false,
        'another-class': true
      })).toBe('base-class another-class')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    it('should handle mixed input types', () => {
      expect(cn(
        'base',
        ['array-class'],
        { 'object-class': true },
        undefined,
        'final'
      )).toBe('base array-class object-class final')
    })
  })
})