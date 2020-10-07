const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArray = [];
let teamstr = ``;

async function main() {
  try {
    await prompt();
    for (let i = 0; i < teamArray.length; i++) {
      teamstr = teamstr + html.generateCard(teamArray[i]);
    }
    let finalHTML = html.generateHTML(teamstr);
    console.log(teamstr);
    writeFileAsync("./output/team.html", finalHTML);
  } catch (err) {
    return console.log(err);
  }
}
async function prompt() {
  let responseDone = "";
  do {
    try {
      response = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is your name?: ",
        },
        {
          type: "input",
          name: "id",
          message: "What is your ID?: ",
        },
        {
          type: "input",
          name: "email",
          message: "What is your email address?: ",
        },
        {
          type: "list",
          name: "role",
          message: "What is your title?:",
          choices: ["Engineer", "Intern", "Manager"],
        },
      ]);

      let response2 = "";
      if (response.role === "Engineer") {
        response2 = await inquirer.prompt([
          {
            type: "input",
            name: "x",
            message: "What is the employee's github username?:",
          },
        ]);
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response2.x
        );
        teamArray.push(engineer);
      } else if (response.role === "Intern") {
        response2 = await inquirer.prompt([
          {
            type: "input",
            name: "x",
            message: "What school is the employee attending?:",
          },
        ]);
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response2.x
        );
        teamArray.push(intern);
      } else if (response.role === "Manager") {
        response2 = await inquirer.prompt([
          {
            type: "input",
            name: "x",
            message: "What is the employee's office number?:",
          },
        ]);
        const manager = new Manager(
          response.name,
          response.id,
          response.email,
          response2.x
        );
        teamArray.push(manager);
      }
    } catch (err) {
      return console.log(err);
    }
    console.log(teamArray);
    responseDone = await inquirer.prompt([
      {
        type: "list",
        name: "finish",
        message: "Do you want to continue?: ",
        choices: ["Yes", "No"],
      },
    ]);
  } while (responseDone.finish === "Yes");
}
main();
