async function init() {

  var blockedDomains = []

  // fetch blocked domains
  const fetchBlockedDomains = await fetch('https://raw.githubusercontent.com/SurveVedant/WebWarden-MaliciousSiteCatalog/main/blocked_urls.json')
  blockedDomains = await fetchBlockedDomains.json()


  const currentURL = new URL(window.location.href)
  const warningPage = chrome.runtime.getURL('view/warning.html').toString()
  
  // set 'SecureNet' to session storage if the URL contain it
  if(currentURL.searchParams.has('WebWarden')) {
    sessionStorage.setItem('WebWarden', true)
  }
  
  // check if url contains a blocked domain
  if(blockedDomains.some(v => window.location.hostname.includes(v))) {
    
    // if page doesn't contains param "SecureNet" or local storage "SecureNet"
    if(!currentURL.searchParams.has('WebWarden') && !sessionStorage.getItem('WebWarden')) {
      window.location = warningPage + "?from=" + window.location.href
    }
  
  }

}

init()
