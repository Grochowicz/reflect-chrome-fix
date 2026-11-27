import { describe, expect, test } from 'vitest';
import { shouldBlockURL } from './block_check';
// if google.com is blocked, meet.google.com includes .google.com --> meet.google.com is not blocked
// conversely if meet.google.com is blocked, google.com does not include meet.google.com --> google.com is not blocked
// checkURL(strippedURL: string, exactURL: string, site: string): boolean
describe('shouldBlockURL', () => {
    test('simple identity', () => {
        expect(shouldBlockURL('https://www.google.com', 'google.com')).toBe(true);
    });
    test('subpage', () => {
        expect(shouldBlockURL('https://www.google.com/search', 'google.com')).toBe(true);
    });
    test('meet.google.com not blocked if google.com is blocked', () => {
        expect(shouldBlockURL('https://meet.google.com/meetingroom', 'google.com')).toBe(false);
    });
    test('google.com not blocked if meet.google.com is blocked', () => {
        expect(shouldBlockURL('https://google.com/search', 'meet.google.com')).toBe(false);
    });
    test('bibtex.com not blocked if x.com is blocked', () => {
        expect(shouldBlockURL('https://bibtex.com', 'x.com')).toBe(false);
    });
});
