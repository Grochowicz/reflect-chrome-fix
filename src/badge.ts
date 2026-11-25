// badge.ts is a module responsible for controlling the badge that displays whitelist time left
import { cleanDomain } from './util'
import { getStorage } from './storage'

export const alarmNamePrefix: string = 'refreshBadgeAlarm:'

export function setBadgeUpdate(domain: string) {
  chrome.alarms
    .create(alarmNamePrefix + domain, {
      when: Date.now() + 1000,
      periodInMinutes: 1,
      persistAcrossSessions: true,
    })
    .then(() => {
      console.log('created alarm for ' + domain)
    })
}

export function cancelBadgeRefreshAlarm(domain): void {
  let wasCleared: Promise<boolean> = chrome.alarms.clear(alarmNamePrefix + domain)
  wasCleared.then((wasCleared) => {
    console.log('clear: ' + domain + ' alarm clear attempt:' + wasCleared)
  })
}

function clearBadgeText(): void {
  chrome.action.setBadgeText({
    text: '',
  })
}

export function refreshBadge(): void {
  // get current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const urls: string[] = tabs.map((x) => x.url)
    const domain: string = cleanDomain(urls)

    if (domain === '') {
      clearBadgeText()
      return
    }

    // get whitelisted sites
    getStorage().then((storage) => {
      if (!storage.isEnabled) {
        clearBadgeText()
        return
      }

      if (storage.whitelistedSites.hasOwnProperty(domain)) {
        const expiry: Date = new Date(storage.whitelistedSites[domain])
        const currentDate: Date = new Date()
        const timeDifference: number = expiry.getTime() - currentDate.getTime()

        setBadge(timeDifference, domain)
      } else {
        clearBadgeText()
      }
    })
  })
}

function setBadge(time: number, domain: string) {
  time = Math.round(time / 1000)
  if (time <= 0) {
    clearBadgeText()
  } else {
    const min: number = Math.ceil(time / 60)
    chrome.action.setBadgeText({
      text: '<' + min.toString() + 'm',
    })
  }
}
