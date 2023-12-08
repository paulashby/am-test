import inquirer from 'inquirer';

const prompts = [
    {
        type: "input",
        name: "api_version",
        message: "API version:",
        default: "v2021-10-21",
        validate: validateString,
    },
    {
        type: "input",
        name: "token",
        message: "Token:",
        validate: validateString,
    },
    {
        type: "input",
        name: "project_id",
        message: "Project ID:",
        validate: validateString,
    },
    {
        type: "list",
        name: "dataset",
        message: "Dataset",
        choices: ["production", "development"],
        default: 1
    },
    {
        type: "input",
        name: "field_id",
        message: "Select Menu Field ID:",
        validate: validateString,
    },
    {
        type: "input",
        name: "data_source",
        message: "Path to data source",
        validate: validatePath,
    }
];

inquirer
.prompt(prompts)
.then((data) => {
    console.log(data);
});

function validateString (input) {
    if (typeof input === "string" && /^[A-Za-z0-9-]+$/i.test(input)){
        return true;
    }
    return "Please use only letters, numbers or hyphens";
}

function validatePath (input) {
    if (typeof input === "string" && /\.\.?\/[^\n"?:*<>|]+\.[A-z0-9]+/g.test(input)){
        return true;
    }
    return "Please enter a relative file path";
}

