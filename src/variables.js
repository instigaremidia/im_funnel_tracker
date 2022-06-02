/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  var SPREAD_ID = "1ed2mOWoQjc7Vicq-XqEVSDQONeFD4srjeLEuTbti-7M"
  var STORE_SHEET_NAME = "PDA2"
  var API_URL = "https://script.google.com/macros/s/AKfycbxaAJBwji_UqcMMrCWX2AWzEDsSNSmAgKjCxv8ZcBchAB_s2MGDGSSlGEWRHfZ97sD7/exec"
  var CHECKOUT_URL = "seguro.produtosdoamanha.com.br"
  var COOKIE_DOMAIN = "produtosdoamanha.com.br"

  var USER_IP_ADDRESS = ""
  var USER_LOCATION = ""
  var CHECKOUT_DELAY = 4000
  var COOKIE_IP = ""
  var IS_FIRST_SESSION = ""

  var CURRENT_FUNIL_PAGE = ""
  var OTHER_PAGE_ALREADY = false;
  var CHECKOUT_ALREADY = false;
  var ADDRESS_ALREADY = false;
  var PAYMENT_ALREADY = false;
  var FINALIZATION_ALREADY = false;
  var HAS_CHECKED_IF_IS_FIRST_SESSION = false;

  var exportObj = {
    SPREAD_ID,
    STORE_SHEET_NAME,
    API_URL,

    CHECKOUT_URL,
    COOKIE_DOMAIN,
    
    USER_IP_ADDRESS,
    USER_LOCATION,
    CHECKOUT_DELAY,
    COOKIE_IP,
    IS_FIRST_SESSION,

    CURRENT_FUNIL_PAGE,
    OTHER_PAGE_ALREADY,
    CHECKOUT_ALREADY,
    ADDRESS_ALREADY,
    PAYMENT_ALREADY,
    FINALIZATION_ALREADY,
    HAS_CHECKED_IF_IS_FIRST_SESSION
  }

  return exportObj

}

/* ################################################################################################################################# */
