const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const str_context = JSON.stringify(github.context);
  console.log("Payload is of Type "+typeof(github.context.payload));
  console.log("The commiter is "+github.context.payload.commits[0].author.username+" and its of type "+typeof(github.context.payload.commits[0].author.username));
  console.log("Repo Var is of Type "+typeof(github.context.repo));
  console.log("=========Context Var ENDS==========")
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}