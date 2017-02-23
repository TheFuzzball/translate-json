/* eslint-env jest */

const minimist = require('minimist')

const {
  parseLanguage,
  parseApiChoice
} = require('../lib/cli')

describe('command line interface', () => {
  describe('language arguments', () => {
    it('-l ru', () => {
      const m = minimist(['-l', 'ru'])
      expect(parseLanguage(m)).toBe('ru')
    })
    it('--lang gb', () => {
      const m = minimist(['--lang', 'gb'])
      expect(parseLanguage(m)).toBe('gb')
    })
    it('--language ie', () => {
      const m = minimist(['--language', 'ie'])
      expect(parseLanguage(m)).toBe('ie')
    })
  })

  describe('api arguments', () => {
    it('--translator yandex --apiKey abc123', () => {
      const m = minimist('--translator yandex --apiKey abc123'.split(' '))
      expect(parseApiChoice(m)).toEqual({api: 'yandex', 'apiKey': 'abc123'})
    })
    it('--t yandex --key def456', () => {
      const m = minimist('--t yandex --key def456'.split(' '))
      expect(parseApiChoice(m)).toEqual({api: 'yandex', 'apiKey': 'def456'})
    })
    it('--t lewhat --key def456', () => {
      const m = minimist('--t lewhat --key def456'.split(' '))
      expect(() => parseApiChoice(m)).toThrow()
    })
  })
})
