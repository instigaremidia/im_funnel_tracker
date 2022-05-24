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
