
// ############################################################################################ //
// ######### AUX FUNCTION ##################################################################### //
// ############################################################################################ //

// ######### EVENT FUNCTIONS ################################################################## //

function pushEntryToDataLayer(eventName, keyName, keyValue) {

  var objToPush = {}

  objToPush["event"] = eventName
  objToPush[keyName] = keyValue

  dataLayer.push(objToPush);
}

function fireFacebookEvent(eventName, eventObject) { /* =================================== */
  console.log("FBQ EVENT: " + eventName)

  fbq('trackCustom', eventName, eventObject);
  /* fbq('track', eventName); */
}

function fireGoogleEvent(eventName, eventObject) {

  console.log("GOOGLE EVENT: " + eventName)

  gtag('event', eventName, eventObject);

}

// ######### GET INFO FUNCTIONS ############################################################### //

function getDataLayerInfo() { /* ====================================== */

  var tagkey = {{ Container ID }}
  var dataModel = window.google_tag_manager[tagkey].dataLayer.get({ split: function () { return []; } });

  return dataModel;
}

function getIpInfo() { /* ============================================== */

  var url = 'https://myip.wtf/json';

  fetch(url).then(function (response) {
    return response.json()
  })
    .then(function (data) {
      USER_IP_ADDRESS = data.YourFuckingIPAddress
      USER_LOCATION = data.YourFuckingLocation

      pushEntryToDataLayer("LVT_ip_event", "LVT_ip", USER_IP_ADDRESS)
      saveCookie("LVT_ip", USER_IP_ADDRESS)
    })

}

function getDateInfo() { /* ============================================ */
  var dateObj = new Date();
  dateObj.setHours(dateObj.getHours() + 0);
  var currentDate = dateObj.toLocaleDateString('pt-BR');
  var currentHour = (dateObj.getHours().toString().length == 1) ? "0" + dateObj.getHours() : dateObj.getHours()
  var currentMinute = (dateObj.getMinutes().toString().length == 1) ? "0" + dateObj.getMinutes() : dateObj.getMinutes()
  var currentTime = currentHour + ":" + currentMinute

  var dateObj = {}
  dateObj.currentDate = currentDate
  dateObj.currentTime = currentTime

  return dateObj
}

// ######### API FUNCTIONS #################################################################### //

function sendDataToApi(method, queryUrl) {

  var finalUrl = API_URL + "/" + method + "?" + queryUrl
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
