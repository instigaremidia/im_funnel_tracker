/* ################################################################################################################################# */

function exportCurrentModule() { /* ================================================================================= */

  const exportObj = {
    updateCookie,
    deleteCookie,
    getCookie,
    saveCookie
  }

  return exportObj

}

/* ################################################################################################################################# */

function updateCookie(name, value) { /* ============================================================================= */
  deleteCookie(name)
  saveCookie(name, value)
}

function deleteCookie(name) { /* ==================================================================================== */
  document.cookie = name + '=; Max-Age=-99999999;';
}

function getCookie(name) { /* ======================================================================================= */
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

function saveCookie(cookieName, cookieValue, cookie_domain) { /* =================================================================== */

  var expirationTime = 2592000;
  expirationTime = expirationTime * 1000;
  var date = new Date();
  var dateTimeNow = date.getTime();
  date.setTime(dateTimeNow + expirationTime);
  var date = date.toUTCString();

  document.cookie = cookieName + "=" + cookieValue + "; SameSite=None; Secure; expires=" + date + "; path=/; domain=." + cookie_domain; // location.hostname.replace(/^www\./i, "")

}

/* ################################################################################################################################# */