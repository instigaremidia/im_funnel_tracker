/* ################################################################################################################################# */

var USER_NAME = "instigaremidia"
var REPO_NAME = "gtm_tracker"

var GLOBAL_VARIABLES = {}
var GLOBAL_FUNCTIONS = {}
var GLOBAL_LOADED_FUNCTIONS = 0

var GLOBAL_FILES_TO_IMPORT = [
  ['cookies_functions', '/modules/cookies.js'],
  ['queries_functions', '/modules/queries.js']
]

var GLOBAL_VARIABLES_FILE_TO_IMPORT = "/modules/variables.js"

setGlobalVariablesObject(GLOBAL_VARIABLES_FILE_TO_IMPORT)
addArrayFilesFunctionsToGlobalObject(GLOBAL_FILES_TO_IMPORT)
runWhenAllFunctionsAreReady(GLOBAL_FILES_TO_IMPORT, initFunction)

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

function setGlobalVariablesObject(variablesFilePath){
  
  getGithubFileContent(USER_NAME, REPO_NAME, variablesFilePath)
  .then(function (raw) { return getFunctionsObject(raw) })
  .then(function (variablesObj) { 

    GLOBAL_VARIABLES = {
      ...GLOBAL_VARIABLES,
      ...variablesObj
    }

  })
}

function addArrayFilesFunctionsToGlobalObject(filesArray) { /* ====================================================== */

  for (let x = 0; x < filesArray.length; x++) {
    getGithubFileContent(USER_NAME, REPO_NAME, filesArray[x][1])
      .then(function (raw) { return getFunctionsObject(raw) })
      .then(function (functionsObj) { 

        GLOBAL_FUNCTIONS = {
          ...GLOBAL_FUNCTIONS,
          ...functionsObj
        }

        GLOBAL_LOADED_FUNCTIONS = GLOBAL_LOADED_FUNCTIONS + 1
      })
  }

}


function getGithubFileContent(username, reponame, filePath) { /* ==================================================== */

  var api_link = "https://api.github.com/repos"
  var final_link = `${api_link}/${username}/${reponame}/contents/${filePath}`

  return fetch(final_link).then(function (response) {
    return response.json()
  }).then(function (data) {
    var encodedContent = data.content
    var content = atob(encodedContent)
    return content
  })

}

function getFunctionsObject(rawContent) { /* ======================================================================== */
  var final_content = `
  (function(){
    ${rawContent}
    var finalObj = exportCurrentModule()
    return finalObj
  })();
  `
  var result = eval(final_content)
  return result
}

/* ################################################################################################################################# */