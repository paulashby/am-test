import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { createClient } from "@sanity/client";
import inquirer from 'inquirer';
import pThrottle from "p-throttle";

const prompts = [
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
        name: "field_id",
        message: "Select Menu Field ID:",
        validate: validateString,
    },
    {
        type: "input",
        name: "id_prefix",
        message: "Alphanumeric prefix for IDs to avoid collisions:",
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
    uploadData(data);
});

async function uploadData(data) {
    const { project_id, dataset, api_version, token, field_id, id_prefix, data_source } = data;

    const clientConfig = {
        projectId: project_id,
        dataset: dataset,
        apiVersion: api_version,
        token: token,
        useCdn: false,
      };
      
    const client = createClient(clientConfig);
    const content = await fs.readFile(data_source);
    const records = parse(content, {bom: true});
    const recordTitles = records.shift();
    const throttle = pThrottle({
        limit: 20,
        interval: 1000
    });
    
    const persistPlatformBatch = throttle(async (batch) => {
        const transaction = batch.reduce(
            (trx, rec) => trx
                    .createOrReplace({
                        _id: `${id_prefix}.${rec[0]}`,
                        _type: "selectItem",
                        name: rec[2],
                        userCount: 0,
                        isQuarantined: false
                    })
                    .patch(field_id, p => p.setIfMissing({selectItems: []})
                    .insert("after", "selectItems[-1]", [
                        {_type: "reference", _ref: `${id_prefix}.${rec[0]}`}
                    ]))
            , client.transaction()
        );

        transaction.commit({autoGenerateArrayKeys: true})
        .then((res) => {
            const from = batch[0][0];
            const to = batch[batch.length - 1][0];
            console.log(`Committed ${batchBounds(batch, id_prefix)}`)
        })
        .catch((err) => {
            console.log(`Transaction failed for ${batchBounds(batch, id_prefix)}: ${err}. Retrying`);
            persistPlatformBatch(batch);
        });

        return batchEndId(batch);
    });

    let batch = [];
    for (let i = 0; i < records.length; i++) {
        batch.push(records[i]);

        if (batch.length === 10 || (i === records.length - 1 && batch.length > 0)) {
            (async () => {
                console.log(`Processed to ${await persistPlatformBatch(batch)}`);
            })();
            batch = [];
        }
    }
}

function validateString (input) {
    if (typeof input === "string" && /^[a-z0-9-]+$/i.test(input)){
        return true;
    }
    return "Please use only letters, numbers or hyphens";
}

function validatePath (input) {
    if (typeof input === "string" && /\.\.?\/[^\n"?:*<>|]+\.[a-z0-9]+/g.test(input)){
        return true;
    }
    return "Please enter a relative file path ending with a file name with extension";
}

function batchBounds (batch, prefix) {
    const from = batch[0][0];
    const to = batchEndId(batch);
    return `${prefix}.${from} - ${prefix}.${to}`;
}

function batchEndId (batch) {
    return batch[batch.length - 1][0];
}
