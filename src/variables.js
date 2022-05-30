/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  var API_NAME = "TORA"
  var API_AGE = 32
  var API_URL = "https://instigare-backup.herokuapp.com/api/sheets" // instigaremidia.com
  var CHECKOUT_URL = "seguro.produtosdoamanha.com.br"
  var COOKIE_DOMAIN = "produtosdoamanha.com.br"
  var STORE_SHEET_NAME = "PDA"

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
    API_NAME,
    API_AGE,
    API_URL,
    CHECKOUT_URL,
    COOKIE_DOMAIN,
    STORE_SHEET_NAME,
    
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
