// block_check.ts is a module that isolates the logic for checking if a URL should be blocked given an item from the blocklist
import { cleanDomain } from './util';
// check to see if domain is whitelisted
function isWhitelistedWrapper(href) {
    const WHITELISTED_WRAPPERS = ['facebook.com/flx', 'l.facebook.com'];
    return WHITELISTED_WRAPPERS.some((wrapper) => href.includes(wrapper));
}
// strippedURL and exactURL are of the URL to be checked. site is the site to check against, listed in the blocklist
export function shouldBlockURL(href, site) {
    const strippedURL = cleanDomain(href, false);
    const exactURL = cleanDomain(href, true);
    // if google.com is blocked, meet.google.com includes .google.com --> meet.google.com is not blocked
    // conversely if meet.google.com is blocked, google.com does not include meet.google.com --> google.com is not blocked
    return (((!strippedURL.includes(`.${site}`) && strippedURL == site) || exactURL === site) &&
        !isWhitelistedWrapper(href));
}
