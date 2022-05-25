/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  const exportObj = {
    runFunnelFunctionWhenReady,
    // runFunnelFunction
  }

  return exportObj

}

/* ################################################################################################################################# */

function runFunnelFunctionWhenReady() { /* =========================================================================== */

  console.log("CHECKED!")

  function checkConditions() {

    try {

      if (typeof gtag === "function") {
        return true
      } else {
        return true // false
      }

    } catch (e) {
      return false
    }
  }

  var shouldRunFunction = checkConditions()

  if (shouldRunFunction) {
    runFunnelFunction()
  } else {
    setTimeout(function () {
      runFunnelFunctionWhenReady()
    }, 1000)
  }

}

function runFunnelFunction() {  /* =================================================================================== */

  // ######### VARIABLES ######################################################################## //
  console.log("INIT FUNIL FUNCTION")

  var getCookie = GLOBAL_FUNCTIONS.getCookie
  var getIpInfo = GLOBAL_FUNCTIONS.getIpInfo
  var saveCookie = GLOBAL_FUNCTIONS.saveCookie

  // ######### CHECK IF IS FIRST SESSION ######################################################## //
  GLOBAL_VARIABLES.IS_FIRST_SESSION = getCookie("LVT_is_first_session")
  if (!GLOBAL_VARIABLES.IS_FIRST_SESSION) {
    GLOBAL_VARIABLES.IS_FIRST_SESSION = true
    getIpInfo()
    saveCookie("LVT_is_first_session", false, GLOBAL_VARIABLES.COOKIE_DOMAIN)
    saveCookie("LVT_funil_maximun_step", 1, GLOBAL_VARIABLES.COOKIE_DOMAIN)
  } else {
    GLOBAL_VARIABLES.COOKIE_IP = getCookie("LVT_ip")
  }

  // ######### CHECK PAGE ####################################################################### //

  var hostname = window.location.hostname
  var pathname = window.location.pathname

  if (hostname === GLOBAL_VARIABLES.CHECKOUT_URL) {

    GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "checkout_initial_page"

    console.log("CURRENT PAGE: " + GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE)
    checkoutStepLoop()

  } else {

    if (pathname === "/") {
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "home_page"
    } else if (pathname.search("products") > -1) {
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "product_page"
    } else if (pathname === "/pages/rastrear-pedido") {
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "track_order_page"
    } else if (pathname === "/collections/all") {
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "all_products_page"
    } else if (pathname.search("/collections") > -1) {
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "collection_page"
    }

    console.log("CURRENT PAGE: " + GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE)
    storePagesLoop()

  }


  // ############################################################################################ //
  // ######### PAGES LOOP ####################################################################### //
  // ############################################################################################ //

  function ifItIsFirstAcessSaveData() { /* ================================= */

    var getFirstAccessinfo = GLOBAL_FUNCTIONS.getFirstAccessinfo
    var objectToQuery = GLOBAL_FUNCTIONS.objectToQuery
    var fireFacebookEvent = GLOBAL_FUNCTIONS.fireFacebookEvent
    var fireGoogleEvent = GLOBAL_FUNCTIONS.fireGoogleEvent
    var sendDataToApi = GLOBAL_FUNCTIONS.sendDataToApi
    var getCookie = GLOBAL_FUNCTIONS.getCookie
    
    if (GLOBAL_VARIABLES.IS_FIRST_SESSION === true) {
      
      var hasIpInformation = GLOBAL_VARIABLES.USER_IP_ADDRESS !== ""

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
        setTimeout(ifItIsFirstAcessSaveData, GLOBAL_VARIABLES.CHECKOUT_DELAY)
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

    if (!GLOBAL_VARIABLES.OTHER_PAGE_ALREADY) {

      GLOBAL_VARIABLES.OTHER_PAGE_ALREADY = true
      ifItIsFirstAcessSaveData()
      return;

    }

    setTimeout(storePagesLoop, GLOBAL_VARIABLES.CHECKOUT_DELAY)
  }

  function checkoutStepLoop() { /* ================================================================================== */

    // IMPORT GLOBAL OBJECTS ---------------------------------------------------
    var objectToQuery = GLOBAL_FUNCTIONS.objectToQuery
    var getCookie = GLOBAL_FUNCTIONS.getCookie
    var getCheckoutInfo = GLOBAL_FUNCTIONS.getCheckoutInfo
    var updateCookie = GLOBAL_FUNCTIONS.updateCookie
    var sendDataToApi = GLOBAL_FUNCTIONS.sendDataToApi
    var fireFacebookEvent = GLOBAL_FUNCTIONS.fireFacebookEvent
    var fireGoogleEvent = GLOBAL_FUNCTIONS.fireGoogleEvent

    // -------------------------------------------------------------------------
    var pathname = window.location.pathname

    var isInCheckout = pathname === "/checkout"
    var isInAddress = pathname.search("address") > -1
    var isInPayment = pathname.search("payment") > -1
    var isInFinalization = pathname.search("finalization") > -1
    var maximum_funil_step = getCookie("LVT_funil_maximun_step")

    if (!GLOBAL_VARIABLES.HAS_CHECKED_IF_IS_FIRST_SESSION) {
      GLOBAL_VARIABLES.HAS_CHECKED_IF_IS_FIRST_SESSION = true
      ifItIsFirstAcessSaveData()
    }

    if (isInCheckout && !GLOBAL_VARIABLES.CHECKOUT_ALREADY) {

      GLOBAL_VARIABLES.CHECKOUT_ALREADY = true
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "checkout_page"
      console.log("\n" + "2 - " + GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE + " -----------------------------------")

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

    if (isInAddress && !GLOBAL_VARIABLES.ADDRESS_ALREADY) {

      GLOBAL_VARIABLES.ADDRESS_ALREADY = true
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "address_page"
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

    if (isInPayment && !GLOBAL_VARIABLES.PAYMENT_ALREADY) {

      GLOBAL_VARIABLES.PAYMENT_ALREADY = true
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "payment_page"
      console.log("\n" + "4 - " + GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE + " -----------------------------------")

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

    if (isInFinalization && !GLOBAL_VARIABLES.FINALIZATION_ALREADY) {

      GLOBAL_VARIABLES.FINALIZATION_ALREADY = true
      GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE = "purchase_page"
      console.log("\n" + "5 - " + GLOBAL_VARIABLES.CURRENT_FUNIL_PAGE + " -----------------------------------")

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

    setTimeout(checkoutStepLoop, GLOBAL_VARIABLES.CHECKOUT_DELAY)
  }


};
