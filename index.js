const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");

async function run() {

  try {
    const token = core.getInput('mytoken'); //get the user token from as an input from the Workflow file
    const required_approvers = core.getInput('required_approvers');
    const octokit = new Octokit({ auth: token });
    //const octokit = github.getOctokit(token); //instantiate the octokit using the token
    //https://octokit.github.io/rest.js/v18
    //Use the functions described 
    console.log("REPO!!!!"+github.context.repo.owner);
    const what = await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      branch: 'master',
      required_status_checks: null,
      enforce_admins: false,
      required_pull_request_reviews: {
        dismiss_stale_reviews: false,
        require_code_owner_reviews: false,
        required_approving_review_count: 3
      },
      restrictions: null
    });
    console.log("Are we here?"+JSON.stringify(what.data));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();