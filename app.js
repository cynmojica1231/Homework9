const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];
async function createManager() {
    let managerResponses = await inquirer.prompt(questions.manager);
    let newManager = new Manager
        (managerResponses.mgrName,
            managerResponses.mgrId,
            managerResponses.mgrEmail,
            managerResponses.mgrOffice);

    employees.push(newManager);
    console.log("Thanks! We've added a new manager to the team: ", newManager);
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
async function confirmEmployee() {
    let confirmEmployee = await inquirer.prompt(questions.create);
    switch (confirmEmployee.confirmEmp) {
        case false:
            console.log("Thank you for your input so far. Here are your team members: ", employees);
            console.log('Generating your HTML page next...');
            return;
        case true:
            await createEmployee();
    };
};

async function createEmployee() {
    let employeeRole = await inquirer.prompt(questions.employee);
    switch (employeeRole.empRole) {
        case 'Engineer':
            let engResponses = await inquirer.prompt(questions.engineer);
            let newEngineer = new Engineer
                (engResponses.engName,
                    engResponses.engId,
                    engResponses.engEmail,
                    engResponses.engGithub);
            employees.push(newEngineer);
            console.log("Thanks! We've added a new engineer to the team: ", newEngineer);
            await confirmEmployee();
            break;
        case 'Intern':
            let internResponses = await inquirer.prompt(questions.intern);
            let newIntern = new Intern
                (internResponses.internName,
                    internResponses.internId,
                    internResponses.internEmail,
                    internResponses.internSchool);
            employees.push(newIntern);
            console.log("Thanks! We've added a new intern to the team: ", newIntern);
            await confirmEmployee();
    };
};
async function init() {
    try {
        await createManager();

        // Next, ask if they'd like to create another team member and createEmployee() within confirmEmployee function
        await confirmEmployee();
    } catch (error) {
        console.log(error);
    };
    try {
        /* After the user has input all employees desired, call the render function and pass an array containing all employee objects.
        The render function will generate and return a block of HTML including templated divs for each employee. */
        let renderedHTML = render(employees);
        /* Take HTML returned from render() function and write to file named team.html in the docs folder */
        // I have named it docs instead of output so that the page appears on GitHub pages
        fs.writeFileSync('./docs/index.html', renderedHTML);

        console.log('Success! Your HTML page has been generated in the docs folder.')

    } catch (error) {
        console.log(error);
    }

};

init();

 