// util.ts provides utility functions that can be reused in other modules

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000)
}

export function cleanDomain(
  url: string | undefined,
  exact: boolean = false,
  user_input: boolean = false
): string {
  // check to see if urls exist or include spaces
  if (url === undefined || url.includes(' ')) {
    // return empty if not
    return ''
  } else {
    // this will match any scheme that goes like scheme://
    const https: RegExp = user_input ? /(^[\w\-\+]+:\/{2})?/ : /(^[\w\-\+]+:\/{2})/
    // this will match the likes of www.google.com/search or www.google.com/
    const domain: RegExp = exact ? /([^#?]+)/ : /([\w\.:-]+)/
    const activeURL: RegExpMatchArray | null = url.match(new RegExp(https.source + domain.source))

    // no matching sites, return empty
    if (activeURL == null) {
      return ''
    } else {
      // check if url is not just http://
      const schemeOnly: RegExpMatchArray | null = activeURL[2].match(/(^[\w\-\+]+:\/{2})/)
      if (schemeOnly) {
        return ''
      }

      if (activeURL[2].startsWith('www.')) {
        // strip www.
        return activeURL[2].replace('www.', '')
      } else {
        return activeURL[2]
      }
    }
  }
}

export function insertAfter(newNode: HTMLElement, existingNode: HTMLElement) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

export function createDivFromHTML(htmlString: string): HTMLElement {
  const newDiv = document.createElement('div')
  newDiv.insertAdjacentHTML('beforeend', htmlString)
  return newDiv
}

export function getElementFromForm(id: string): HTMLFormElement {
  return document.getElementById(id) as HTMLFormElement
}
