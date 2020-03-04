const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?"
    },
    {
      type: "input",
      name: "description",
      message: "Enter a brief description of project."
    },
    {
      type: "list",
      name: "installation",
      message: "How to install?",
      choices: [" ", "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running."]
    },
    {
      type: "list",
      name: "usage",
      message: "How can this be used?",
      choices: [" ", "Provide instructions and examples for use. Include screenshots as needed."]
    },
    {
      type: "checkbox",
      name: "license",
      message: "Pick a license!",
      choices: [" ",
      `[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
      `[![ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`,
      `[![WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`,
    
       ] },
    {
      type: "list",
      name: "credits",
      message: "Any collaborators on this project?",
      choices: [" ", "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well."]
    },
    {
      type: "list",
      name: "contributing",
      message: "Would you like others to be able to contribute to this project?",
      choices: [" ", "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The Contributor Covenant is an industry standard, but you can always write your own."] 
    
    },
    {
      type: "list",
      name: "tests",
      message: "Did you write any tests?",
      choices: [" ", "Go the extra mile and write tests for your application. Then provide examples on how to run them."]
    },
    {
      type: "checkbox",
      name: "questions",
      message: "For questions...",
      choices: [" ", "Email me at jhandy4@gmail.com"]
    },
    ]);
}

function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>ReadMe</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">${answers.title}</h1>
      <p class="lead">Description: ${answers.description}.</p>
      <h3>Table of Contents</h3>
      <ul class="list-group">
        
        <li class="list-group-item text-light bg-dark font-italic">Installation </li>
          <p>${answers.installation}</p>
        <li class="list-group-item text-light bg-dark font-italic">Usage </li>
          <p>${answers.usage}</p>
        <li class="list-group-item text-light bg-dark font-italic">License</li>
          <p>${answers.license}</p>
        <li class="list-group-item text-light bg-dark font-italic">Credits</li>
          <p>${answers.credits}</p>
        <li class="list-group-item text-light bg-dark font-italic">Contributing</li>
          <p>${answers.contributing}</p>  
        <li class="list-group-item text-light bg-dark font-italic">Tests</li>
          <p>${answers.tests}</p>
        <li class="list-group-item text-light bg-dark font-italic">Questions</li>
          <p>${answers.questions}</p>
          
      </ul>
    </div>
  </div>
  </body>
  </html>`
}

async function init() {
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

init();


// To Do List!!!!!!!!

// Fix badges

// Avatar from node modules
// ${github.avatar_url}

// screencastify some gifs

