function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => {
  const dataUsername = `data-username="${r.owner.login}"`
  const dataRepoName = `data-repository="${r.name}"`
  return(
    `<li>
      <p>${r.name}</p>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" onclick="getCommits(this)">Commits</a><br>
    </li>
    `
  )
  }).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/commits`)
  req.send()
}
