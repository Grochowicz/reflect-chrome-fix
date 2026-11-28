// util.ts provides utility functions that can be reused in other modules
export function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
export function cleanDomain(url, exact = false, user_input = false) {
    // check to see if urls exist or include spaces or <>
    if (url === undefined || url.match(/[\s<>]/)) {
        // return empty if not
        return '';
    }
    else {
        // this will match any scheme that goes like scheme://
        const https = user_input ? /(^[\w\-\+]+:\/{2})?/ : /(^[\w\-\+]+:\/{2})/;
        // this will match the likes of www.google.com/search or www.google.com/
        const domain = exact ? /([^#?]+)/ : /([\w\.:-]+)/;
        const activeURL = url.match(new RegExp(https.source + domain.source));
        // no matching sites, return empty
        if (activeURL == null) {
            return '';
        }
        else {
            // check if url is not just http://
            const schemeOnly = activeURL[2].match(/(^[\w\-\+]+:\/{2})/);
            if (schemeOnly) {
                return '';
            }
            if (activeURL[2].startsWith('www.')) {
                // strip www.
                return activeURL[2].replace('www.', '');
            }
            else {
                return activeURL[2];
            }
        }
    }
}
export function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
export function createDivFromHTML(htmlString) {
    const newDiv = document.createElement('div');
    newDiv.insertAdjacentHTML('beforeend', htmlString);
    return newDiv;
}
export function getElementFromForm(id) {
    return document.getElementById(id);
}
