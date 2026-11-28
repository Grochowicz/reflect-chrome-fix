// badge.ts is a module responsible for controlling the badge that displays whitelist time left
import { cleanDomain } from './util';
import { getStorage } from './storage';
export const alarmNamePrefix = 'refreshBadgeAlarm:';
export function setBadgeUpdate(domain) {
    chrome.alarms
        .create(alarmNamePrefix + domain, {
        when: Date.now() + 1000,
        periodInMinutes: 1,
        persistAcrossSessions: true,
    })
        .then(() => {
        console.log('created alarm for ' + domain);
    });
}
export function cancelBadgeRefreshAlarm(domain) {
    let wasCleared = chrome.alarms.clear(alarmNamePrefix + domain);
    wasCleared.then((wasCleared) => {
        console.log('clear: ' + domain + ' alarm clear attempt:' + wasCleared);
    });
}
function clearBadgeText() {
    chrome.action.setBadgeText({
        text: '',
    });
}
export function refreshBadge() {
    // get current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const urls = tabs.map((x) => x.url);
        const domain = cleanDomain(urls[0]);
        if (domain === '') {
            clearBadgeText();
            return;
        }
        // get whitelisted sites
        getStorage().then((storage) => {
            if (!storage.isEnabled) {
                clearBadgeText();
                return;
            }
            if (storage.whitelistedSites.hasOwnProperty(domain)) {
                const expiry = new Date(storage.whitelistedSites[domain]);
                const currentDate = new Date();
                const timeDifference = expiry.getTime() - currentDate.getTime();
                setBadge(timeDifference, domain);
            }
            else {
                clearBadgeText();
            }
        });
    });
}
function setBadge(time, domain) {
    time = Math.round(time / 1000);
    if (time <= 0) {
        clearBadgeText();
    }
    else {
        const min = Math.ceil(time / 60);
        chrome.action.setBadgeText({
            text: '<' + min.toString() + 'm',
        });
    }
}
