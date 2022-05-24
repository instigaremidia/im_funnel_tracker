function getGithubFileContent(githubFileLink) {

  fetch(githubFileLink).then(function (response) {
    return response.json()
  }).then(function (data) {
    var encodedContent = data.content
    var content = atob(encodedContent)
    return content
  })

}

getGithubFileContent("https://api.github.com/repos/instigaremidia/gtm_tracker/contents/teste.js")
