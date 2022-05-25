/* ################################################################################################################################# */

var GLOBAL_VARIABLES = {
  GITHUB_USER_NAME: "instigaremidia",
  GITHUB_REPO_NAME: "gtm_tracker"
}

var GLOBAL_FUNCTIONS = {}
var GLOBAL_LOADED_FUNCTIONS = 0

var GLOBAL_FUNCTIONS_TO_IMPORT = [
  ['cookies', '/src/modules/cookies.js'],
  ['queries', '/src/modules/queries.js'],
  
  ['get_info', '/src/funnel/get_info.js'],
  ['push_info', '/src/funnel/push_info.js'],
  ['get_page_info', '/src/funnel/get_page_info.js'],
  ['get_page_info', '/src/funnel/funnel.js'],
]

var GLOBAL_VARIABLES_TO_IMPORT = "/src/variables.js"

/* ################################################################################################################################# */

setGlobalVariablesObject(GLOBAL_VARIABLES_TO_IMPORT)
addArrayFilesFunctionsToGlobalObject(GLOBAL_FUNCTIONS_TO_IMPORT)
runWhenAllFunctionsAreReady(GLOBAL_FUNCTIONS_TO_IMPORT, initFunction)

function initFunction(){
  console.log(GLOBAL_FUNCTIONS)
  console.log(GLOBAL_VARIABLES)
}

/* ################################################################################################################################# */

function runWhenAllFunctionsAreReady(functionsArray, functionToRun){ /* ============================================= */

  var check_interval = 400
  var numberOfFunctions = functionsArray.length

  if (numberOfFunctions === GLOBAL_LOADED_FUNCTIONS){
    functionToRun()
  } else {
    setTimeout(function(){
      runWhenAllFunctionsAreReady(functionsArray, functionToRun)
    }, check_interval)
  }
}

/* ################################################################################################################################# */

function setGlobalVariablesObject(variablesFilePath){ /* ============================================================ */
  
  var GITHUB_USER_NAME = GLOBAL_VARIABLES.GITHUB_USER_NAME
  var GITHUB_REPO_NAME = GLOBAL_VARIABLES.GITHUB_REPO_NAME

  getGithubFileContent(GITHUB_USER_NAME, GITHUB_REPO_NAME, variablesFilePath)
  .then(function (raw) { return getFunctionsObject(raw) })
  .then(function (variablesObj) { 
    GLOBAL_VARIABLES = Object.assign(GLOBAL_VARIABLES, variablesObj);
  })
}

function addArrayFilesFunctionsToGlobalObject(filesArray) { /* ====================================================== */

  var GITHUB_USER_NAME = GLOBAL_VARIABLES.GITHUB_USER_NAME
  var GITHUB_REPO_NAME = GLOBAL_VARIABLES.GITHUB_REPO_NAME
  
  for (var x = 0; x < filesArray.length; x++) {
    var currentFilepath = filesArray[x][1]
    getGithubFileContent(GITHUB_USER_NAME, GITHUB_REPO_NAME, currentFilepath)
      .then(function (raw) { return getFunctionsObject(raw) })
      .then(function (functionsObj) { 
        GLOBAL_FUNCTIONS = Object.assign(GLOBAL_FUNCTIONS, functionsObj);
        GLOBAL_LOADED_FUNCTIONS = GLOBAL_LOADED_FUNCTIONS + 1
      })
  }

}

/* ################################################################################################################################# */

function getGithubFileContent(username, reponame, filePath) { /* ==================================================== */

  var api_link = "https://api.github.com/repos"
  var final_link = api_link + '/' + username + '/' + reponame + '/contents/' + filePath

  return fetch(final_link).then(function (response) {
    return response.json()
  }).then(function (data) {
    var encodedContent = data.content
    var content = atob(encodedContent)
    return content
  })

}

function getFunctionsObject(rawContent) { /* ======================================================================== */
  var final_content = '(function(){' + rawContent + 'var finalObj = exportCurrentModule();' + 'return finalObj' + '})()'
  var result = eval(final_content)
  return result
}

/* ################################################################################################################################# */