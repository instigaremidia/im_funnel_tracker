function getGithubFileContent(username, reponame, filePath) {

  var API_LINK = "https://api.github.com/repos"
  var final_link = `${API_LINK}/${username}/${reponame}/contents/${filePath}`
  
  fetch(final_link).then(function (response) {
    return response.json()
  }).then(function (data) {
    var encodedContent = data.content
    var content = atob(encodedContent)
    console.log(content)
    eval(content)
    return content
  })

}

var USER_NAME = "instigaremidia"
var REPO_NAME = "gtm_tracker"
var PATH_COOKIES_MODULE = "/modules/cookies.js"
var PATH_QUERIES_MODULE = "/modules/queries.js"

getGithubFileContent(USER_NAME, REPO_NAME, PATH_COOKIES_MODULE)
getGithubFileContent(USER_NAME, REPO_NAME, PATH_QUERIES_MODULE)
