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

  var SPREAD_ID = GLOBAL_VARIABLES.SPREAD_ID
  var STORE_SHEET_NAME = GLOBAL_VARIABLES.STORE_SHEET_NAME
  var API_URL = GLOBAL_VARIABLES.API_URL

  var commomLink = API_URL + "?" + `spread_id=${SPREAD_ID}` + "&" + `sheet_name=${STORE_SHEET_NAME}`
  var finalUrl = commomLink + "&" + `method=${method}` + "&" + queryUrl
  console.log(finalUrl)

  fetch(finalUrl).then(function (response) {
    return response.json()
  })
  .then(function (data) {
      // console.log(data)
  })
  .catch(function (err) {
    console.log("DEU ERRO, TENTANDO DE NOVO")
    console.log(err)
    // sendDataToApi(method, queryUrl)
  })

}

/* ################################################################################################################################# */