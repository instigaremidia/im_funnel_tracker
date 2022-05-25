/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  const exportObj = {
    pushEntryToDataLayer,
    fireFacebookEvent,
    fireGoogleEvent,
    sendDataToApi
  }

  return exportObj

}

/* ################################################################################################################################# */

function pushEntryToDataLayer(eventName, keyName, keyValue) { /* ==================================================== */
  var objToPush = {}
  objToPush["event"] = eventName
  objToPush[keyName] = keyValue
  dataLayer.push(objToPush);
}

function fireFacebookEvent(eventName, eventObject) { /* ============================================================= */
  console.log("FBQ EVENT: " + eventName)
  fbq('trackCustom', eventName, eventObject);
  /* fbq('track', eventName); */
}

function fireGoogleEvent(eventName, eventObject) { /* =============================================================== */
  console.log("GOOGLE EVENT: " + eventName)
  gtag('event', eventName, eventObject);
}

function sendDataToApi(method, queryUrl) { /* ======================================================================= */

  var finalUrl = GLOBAL_VARIABLES.API_URL + "/" + method + "?" + queryUrl
  console.log(finalUrl)

  fetch(finalUrl).then(function (response) {
    return response.json()
  })
  .then(function (data) {
      // console.log(data)
  })
  .catch(function (data) {
    console.log("DEU ERRO, TENTANDO DE NOVO")
    sendDataToApi(method, queryUrl)
  })

}

/* ################################################################################################################################# */