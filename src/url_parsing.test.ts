import { describe, expect, test } from 'vitest'
import { shouldBlockURL } from './block_check'
import { cleanDomain } from './util'

// if google.com is blocked, meet.google.com includes .google.com --> meet.google.com is not blocked
// conversely if meet.google.com is blocked, google.com does not include meet.google.com --> google.com is not blocked
// checkURL(strippedURL: string, exactURL: string, site: string): boolean
describe('shouldBlockURL', () => {
  test('simple identity', () => {
    expect(shouldBlockURL('https://www.google.com', 'google.com')).toBe(true)
  })
  test('empty string', () => {
    expect(shouldBlockURL('https://www.google.com', '')).toBe(false)
  })
  test('subpage', () => {
    expect(shouldBlockURL('https://www.google.com/search', 'google.com')).toBe(true)
  })
  test('meet.google.com not blocked if google.com is blocked', () => {
    expect(shouldBlockURL('https://meet.google.com/meetingroom', 'google.com')).toBe(false)
  })
  test('google.com not blocked if meet.google.com is blocked', () => {
    expect(shouldBlockURL('https://google.com/search', 'meet.google.com')).toBe(false)
  })
  test('bibtex.com not blocked if x.com is blocked', () => {
    expect(shouldBlockURL('https://bibtex.com', 'x.com')).toBe(false)
  })
})

describe('cleanDomain', () => {
  test('simple identity', () => {
    expect(cleanDomain('google.com', true, true)).toBe('google.com')
  })
  test('empty string', () => {
    expect(cleanDomain('', true, true)).toBe('')
  })
  test('empty domain', () => {
    expect(cleanDomain('https://', true, false)).toBe('')
  })
  test('empty domain, user input', () => {
    expect(cleanDomain('https://', true, true)).toBe('')
  })
  test('not a url', () => {
    expect(cleanDomain('not a url', true, false)).toBe('')
  })
  test('not a url, user input', () => {
    expect(cleanDomain('not a url', true, true)).toBe('')
  })
  test('two dots', () => {
    expect(cleanDomain('google.co.uk', true, true)).toBe('google.co.uk')
  })
  test('chrome extension', () => {
    expect(cleanDomain('chrome-extension://google/search', true, false)).toBe('google/search')
  })
  test('user input with www, no https', () => {
    expect(cleanDomain('www.google.com', true, true)).toBe('google.com')
  })
  test('user input with www, with https', () => {
    expect(cleanDomain('https://www.google.com', true, true)).toBe('google.com')
  })
  test('user input no www, with https', () => {
    expect(cleanDomain('https://google.com', true, true)).toBe('google.com')
  })
})
