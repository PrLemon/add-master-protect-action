const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const token = core.getInput('mytoken');
  const octokit = github.getOctokit(token);
  const commiter = github.context.payload.commits[0].committer.username;
  console.log("We here");
  // if (github.context.ref.includes("master")){
  //   const newIssue = octokit.issues.create({
  //     ...context.repo,
  //     title: 'New commit on master detected!',
  //     body: 'The commit was made by '+commiter
  //   }); 
  // }
   
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}