
// ############################################################################################ //
// ######### AUX FUNCTION ##################################################################### //
// ############################################################################################ //

// ######### COOKIES FUNCTIONS ################################################################ //

function updateCookie(name, value) {
  deleteCookie(name)
  saveCookie(name, value)
}

function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function getCookie(name) {
  var cookies = document.cookie.split(";")
  var toReturn;

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      toReturn = cookie.substring((name + "=").length, cookie.length);
    }
  }

  return toReturn;
}

function saveCookie(cookieName, cookieValue) {

  var expirationTime = 2592000;
  expirationTime = expirationTime * 1000;
  var date = new Date();
  var dateTimeNow = date.getTime();
  date.setTime(dateTimeNow + expirationTime);
  var date = date.toUTCString();

  document.cookie = cookieName + "=" + cookieValue + "; SameSite=None; Secure; expires=" + date + "; path=/; domain=." + COOKIE_DOMAIN; // location.hostname.replace(/^www\./i, "")

}

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

// ######### QUERY FUNCTIONS ################################################################## //

function getQueryParams() { /* ========================================= */
  var queriesUrl = window.location.search.replace("?", "")
  var query_entries = queriesUrl.split("&")
  var queryObj = {}

  for (var x = 0; x < query_entries.length; x++) {
    var row = query_entries[x]
    var key = row.split("=")[0]
    var value = decodeURI(row.split("=")[1])
    queryObj[key] = decodeURI(value)
  }

  return queryObj
}

function objectToQuery(objToConvert) { /* ======================================= */

  var totalQuery = "";
  var objKeys = Object.keys(objToConvert)
  var objValues = Object.values(objToConvert)

  for (var x = 0; x < objKeys.length; x++) {
    var curKey = objKeys[x]
    var curValue = objValues[x]
    var curRow = curKey + "=" + curValue

    if (totalQuery === "") {
      totalQuery = curRow
    } else {
      totalQuery = totalQuery + "&" + curRow
    }
  }

  return totalQuery
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
