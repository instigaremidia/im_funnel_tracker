runFunilFunctionWhenReady()

function runFunilFunctionWhenReady() {

  function checkConditions() {

    try {
  
      if (typeof gtag === "function") {
        return true
      } else {
        return false
      }
  
    } catch (e) {
      return false
    }
  }
  
  var shouldRunFunction = checkConditions()

  if (shouldRunFunction) {
    runFunilFunction()
  } else {
    setTimeout(function () {
      runFunilFunctionWhenReady()
    }, 1000)
  }

}

function runFunilFunction() {

  // ######### VARIABLES ######################################################################## //

  console.log("INIT FUNIL FUNCTION")

  var API_URL = "https://instigaremidia.com/api/sheets"
  var CHECKOUT_URL = "seguro.produtosdoamanha.com.br"
  var COOKIE_DOMAIN = "produtosdoamanha.com.br"
  var STORE_SHEET_NAME = "PDA"

  var USER_IP_ADDRESS = ""
  var USER_LOCATION = ""
  var CHECKOUT_DELAY = 4000
  var COOKIE_IP = ""
  var IS_FIRST_SESSION = getCookie("LVT_is_first_session")

  var CURRENT_FUNIL_PAGE = ""
  var OTHER_PAGE_ALREADY = false;
  var CHECKOUT_ALREADY = false;
  var ADDRESS_ALREADY = false;
  var PAYMENT_ALREADY = false;
  var FINALIZATION_ALREADY = false;
  var HAS_CHECKED_IF_IS_FIRST_SESSION = false;


  // ######### CHECK IF IS FIRST SESSION ######################################################## //

  if (!IS_FIRST_SESSION) {
    IS_FIRST_SESSION = true
    getIpInfo()
    saveCookie("LVT_is_first_session", false)
    saveCookie("LVT_funil_maximun_step", 1)
  } else {
    COOKIE_IP = getCookie("LVT_ip")
  }

  // ######### CHECK PAGE ####################################################################### //

  var hostname = window.location.hostname
  var pathname = window.location.pathname

  if (hostname === CHECKOUT_URL) {

    CURRENT_FUNIL_PAGE = "checkout_initial_page"

    console.log("CURRENT PAGE: " + CURRENT_FUNIL_PAGE)
    checkoutStepLoop()

  } else {

    if (pathname === "/") {
      CURRENT_FUNIL_PAGE = "home_page"
    } else if (pathname.search("products") > -1) {
      CURRENT_FUNIL_PAGE = "product_page"
    } else if (pathname === "/pages/rastrear-pedido") {
      CURRENT_FUNIL_PAGE = "track_order_page"
    } else if (pathname === "/collections/all") {
      CURRENT_FUNIL_PAGE = "all_products_page"
    } else if (pathname.search("/collections") > -1) {
      CURRENT_FUNIL_PAGE = "collection_page"
    }

    console.log("CURRENT PAGE: " + CURRENT_FUNIL_PAGE)
    storePagesLoop()

  }


  // ############################################################################################ //
  // ######### PAGES LOOP ####################################################################### //
  // ############################################################################################ //

  function ifItIsFirstAcessSaveData() { /* ================================= */

    var hasIpInformation = USER_IP_ADDRESS !== ""

    if (IS_FIRST_SESSION === true) {

      if (hasIpInformation) {

        console.log("##### PRIMEIRA SESSÃO  ################################")

        var firstAcessObj = getFirstAccessinfo()
        var queryFromObj = objectToQuery(firstAcessObj)
        sendDataToApi("firstaccess", queryFromObj)
        console.log(firstAcessObj)

        var eventName = 'LVT_first_visitor'
        var eventObject = {}
        fireFacebookEvent(eventName, eventObject)
        fireGoogleEvent(eventName, eventObject)

        console.log("#######################################################")

        return;
      } else {
        setTimeout(ifItIsFirstAcessSaveData, CHECKOUT_DELAY)
      }


    } else {

      console.log("##### NÃO É A PRIMEIRA SESSÃO #########################")

      console.log("IP: " + getCookie("LVT_ip"))
      console.log("FS: " + getCookie("LVT_is_first_session"))
      console.log("MS: " + getCookie("LVT_funil_maximun_step"))

      var eventName = 'LVT_returning_visitor'
      var eventObject = {}
      fireFacebookEvent(eventName, eventObject)
      fireGoogleEvent(eventName, eventObject)

      console.log("#######################################################")
    }

  }

  function storePagesLoop() { /* ========================================= */

    if (!OTHER_PAGE_ALREADY) {

      OTHER_PAGE_ALREADY = true
      ifItIsFirstAcessSaveData()
      return;

    }

    setTimeout(storePagesLoop, CHECKOUT_DELAY)
  }

  function checkoutStepLoop() { /* ====================================== */

    var pathname = window.location.pathname

    var isInCheckout = pathname === "/checkout"
    var isInAddress = pathname.search("address") > -1
    var isInPayment = pathname.search("payment") > -1
    var isInFinalization = pathname.search("finalization") > -1
    var maximum_funil_step = getCookie("LVT_funil_maximun_step")

    if (!HAS_CHECKED_IF_IS_FIRST_SESSION) {
      HAS_CHECKED_IF_IS_FIRST_SESSION = true
      ifItIsFirstAcessSaveData()
    }

    if (isInCheckout && !CHECKOUT_ALREADY) {

      CHECKOUT_ALREADY = true
      CURRENT_FUNIL_PAGE = "checkout_page"
      console.log("\n" + "2 - " + CURRENT_FUNIL_PAGE + " -----------------------------------")

      var checkoutObj = getCheckoutInfo()
      var queryFromObj = objectToQuery(checkoutObj)

      if (maximum_funil_step < 2) {
        updateCookie("LVT_funil_maximun_step", 2)
        sendDataToApi("initiatecheckout", queryFromObj)
      }

      var eventName = 'LVT_checkout'
      var eventObject = {}
      fireFacebookEvent(eventName, eventObject)
      fireGoogleEvent(eventName, eventObject)

    }

    if (isInAddress && !ADDRESS_ALREADY) {

      ADDRESS_ALREADY = true
      CURRENT_FUNIL_PAGE = "address_page"
      console.log("\n" + "3 - " + CURRENT_FUNIL_PAGE + " -----------------------------------")

      var addressObj = getAddressInfo()
      var queryFromObj = objectToQuery(addressObj)

      if (maximum_funil_step < 3) {
        updateCookie("LVT_funil_maximun_step", 3)
        sendDataToApi("addaddressinfo", queryFromObj)
      }

      var eventName = 'LVT_address'
      var eventObject = {}
      fireFacebookEvent(eventName, eventObject)
      fireGoogleEvent(eventName, eventObject)

    }

    if (isInPayment && !PAYMENT_ALREADY) {

      PAYMENT_ALREADY = true
      CURRENT_FUNIL_PAGE = "payment_page"
      console.log("\n" + "4 - " + CURRENT_FUNIL_PAGE + " -----------------------------------")

      var paymentObj = getPaymentInfo()
      var queryFromObj = objectToQuery(paymentObj)

      if (maximum_funil_step < 4) {
        updateCookie("LVT_funil_maximun_step", 4)
        sendDataToApi("addpaymentinfo", queryFromObj)
      }

      var eventName = 'LVT_payment'
      var eventObject = {}
      fireFacebookEvent(eventName, eventObject)
      fireGoogleEvent(eventName, eventObject)

    }

    if (isInFinalization && !FINALIZATION_ALREADY) {

      FINALIZATION_ALREADY = true
      CURRENT_FUNIL_PAGE = "purchase_page"
      console.log("\n" + "5 - " + CURRENT_FUNIL_PAGE + " -----------------------------------")

      var purchaseObj = getPurchaseInfo()
      var queryFromObj = objectToQuery(purchaseObj)

      if (maximum_funil_step < 5) {
        updateCookie("LVT_funil_maximun_step", 5)
        sendDataToApi("purchase", queryFromObj)
      }

      var eventName = 'LVT_purchase'
      var eventObject = {}
      fireFacebookEvent(eventName, eventObject)
      fireGoogleEvent(eventName, eventObject)

    }

    setTimeout(checkoutStepLoop, CHECKOUT_DELAY)
  }


};
