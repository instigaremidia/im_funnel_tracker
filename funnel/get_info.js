/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  const exportObj = {
    getDataLayerInfo,
    getIpInfo,
    getDateInfo,
  }

  return exportObj

}

/* ################################################################################################################################# */

function getDataLayerInfo(tagkey) { /* ============================================================================== */
  // {{ Container ID }}
  var dataModel = window.google_tag_manager[tagkey].dataLayer.get({ split: function () { return []; } });
  return dataModel;
}

function getIpInfo() { /* =========================================================================================== */

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

function getDateInfo() { /* ========================================================================================= */
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

/* ################################################################################################################################# */