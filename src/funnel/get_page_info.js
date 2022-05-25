/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  const exportObj = {
    getFirstAccessinfo,
    getCheckoutInfo,
    getAddressInfo,
    getPaymentInfo,
    getPurchaseInfo
  }

  return exportObj

}

/* ################################################################################################################################# */

function getFirstAccessinfo() { /* ================================================================================== */

  var queryObj = getQueryParams()
  var dataModel = getDataLayerInfo()
  var dateInfo = getDateInfo()
  var firstAccessObj = {}

  firstAccessObj['store_sheet'] = STORE_SHEET_NAME
  firstAccessObj['ip'] = USER_IP_ADDRESS
  firstAccessObj['location'] = USER_LOCATION

  firstAccessObj['page'] = CURRENT_FUNIL_PAGE
  firstAccessObj['date'] = dateInfo.currentDate
  firstAccessObj['time'] = dateInfo.currentTime

  firstAccessObj['referrer'] = document.referrer || "-"

  var utm_campaign = queryObj.utm_campaign ? queryObj.utm_campaign : "-"
  firstAccessObj['utm_campaign'] = decodeURI(utm_campaign)

  var utm_content = queryObj.utm_content ? queryObj.utm_content : "-"
  firstAccessObj['utm_content'] = decodeURI(utm_content)

  var utm_medium = queryObj.utm_medium ? queryObj.utm_medium : "-"
  firstAccessObj['utm_medium'] = decodeURI(utm_medium)

  var utm_source = queryObj.utm_source ? queryObj.utm_source : "-"
  firstAccessObj['utm_source'] = decodeURI(utm_source)

  var utm_term = queryObj.utm_term ? queryObj.utm_term : "-"
  firstAccessObj['utm_term'] = decodeURI(utm_term)

  return firstAccessObj;
}

function getCheckoutInfo() { /* ===================================================================================== */

  var dataModel = getDataLayerInfo()
  var dateInfo = getDateInfo()
  var checkoutObj = {}

  checkoutObj['store_sheet'] = STORE_SHEET_NAME
  checkoutObj['ip'] = COOKIE_IP
  checkoutObj['page'] = CURRENT_FUNIL_PAGE
  checkoutObj['date'] = dateInfo.currentDate
  checkoutObj['time'] = dateInfo.currentTime

  checkoutObj['product'] = dataModel.items[0].group_name
  checkoutObj['price'] = dataModel.prices.total

  return checkoutObj
}

function getAddressInfo() { /* ====================================================================================== */

  var dateInfo = getDateInfo()
  var addressObj = {}

  addressObj['store_sheet'] = STORE_SHEET_NAME
  addressObj['ip'] = COOKIE_IP
  addressObj['page'] = CURRENT_FUNIL_PAGE
  addressObj['date'] = dateInfo.currentDate
  addressObj['time'] = dateInfo.currentTime

  var cpf = document.getElementsByClassName('cpf')
  var cpfValue = cpf[0].innerText

  var email = document.getElementsByClassName('mb5')
  var emailValue = email[0].innerText

  var name = document.getElementsByClassName('mb10')
  var nameValue = name[0].innerText.trim()

  // var phone = document.getElementById('homephone')
  // var phoneValue = phone.value
  // console.log(phoneValue)

  addressObj['cpf'] = cpfValue
  addressObj['email'] = emailValue
  addressObj['name'] = nameValue
  addressObj['phone'] = "CELULAR"

  return addressObj
}

function getPaymentInfo() { /* ====================================================================================== */

  var dataModel = getDataLayerInfo()
  var dateInfo = getDateInfo()
  var paymentObj = {}

  paymentObj['store_sheet'] = STORE_SHEET_NAME
  paymentObj['ip'] = COOKIE_IP
  paymentObj['page'] = CURRENT_FUNIL_PAGE
  paymentObj['date'] = dateInfo.currentDate
  paymentObj['time'] = dateInfo.currentTime

  var cep = document.querySelector('.zipcode')
  var cepValue = cep.innerText

  var shipping = document.querySelector('span.mt15.mb5')
  var shippingValue = shipping.nextSibling.nextSibling.innerText
  shippingValue = shippingValue.trim()
  shippingValue = shippingValue.split('\n')[0]

  paymentObj['cep'] = cepValue
  paymentObj['frete'] = shippingValue

  return paymentObj
}

function getPurchaseInfo() { /* ===================================================================================== */

  var dataModel = getDataLayerInfo()
  var dateInfo = getDateInfo()
  var purchaseObj = {}

  purchaseObj['store_sheet'] = STORE_SHEET_NAME
  purchaseObj['ip'] = COOKIE_IP
  purchaseObj['page'] = CURRENT_FUNIL_PAGE
  purchaseObj['date'] = dateInfo.currentDate
  purchaseObj['time'] = dateInfo.currentTime

  purchaseObj['purchase'] = "SIM"
  purchaseObj['payment_method'] = "?"

  return purchaseObj
}

/* ################################################################################################################################# */