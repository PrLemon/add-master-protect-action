const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = core.getInput('mytoken'); //get the user token from as an input from the Workflow file
  const octokit = github.getOctokit(token); //instantiate the octokit using the token
  //https://octokit.github.io/rest.js/v18
  //Use the functions described 

  //Logic for creating an issue when a commit on master is detected!
  if (github.context.ref.includes("master")){
    const commiter = github.context.payload.commits[0].committer.username;
    const newIssue = octokit.issues.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: 'New commit on master detected!',
      body: 'The commit was made by '+commiter
    });
    console.log("new issue"+JSON.stringify(newIssue.data)+" and type is "+typeof(newIssue)); 
  }
  //end
} catch (error) {
  core.setFailed(error.message);
}