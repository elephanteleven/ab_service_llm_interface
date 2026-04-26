// import fs from "fs";
const fs = require("fs");
// import { createAgent } from "langchain";
const { createAgent } = require("langchain");
// import { ChatOpenAI } from "@langchain/openai";
const { ChatOpenAI } = require("@langchain/openai");
// import { StringOutputParser } from "@langchain/core/output_parsers";
const { StringOutputParser } = require("@langchain/core/output_parsers");
// import { ChatPromptTemplate } from "@langchain/core/prompts";
const { ChatPromptTemplate } = require("@langchain/core/prompts");

module.exports = async (appID, userMessage) => {
appID = appID || "4f8cef52-71fb-44cf-a360-d0b7f3ba5544";
// , including appropriate primary keys, foreign keys (relationships between them), and basic columns (e.g., name, description, timestamps):
userMessage = userMessage || `
Scenario: Mothers want to apply for a bible study group according to the availability of space in the group and be able to select one based on timing and location (N,S, E, W). Group leaders (also Mothers) review the application and set up an interview. Accepted participants become an active group member.


Required Database Tables (Core Schema):
The agent must generate the schema for the following five tables.
- Mothers
- Groups
- Group Meetings
- Applications
- Group Memberships
`;

const tenantUUID = "admin";
const appName = "Test";
const model = new ChatOpenAI({
  configuration: {
    baseURL: process.env.LLM_INTERFACE_LLM_API_URL|| "http://llm:8080/v1",
    apiKey: "gemma-4-e4b",
  },
  model: "gemma-4-e4b",
  temperature: 0,
});
const tools = [];

const appFormat = JSON.stringify({
  "id": appID,
  "type": "application",
  "appType": "web",
  "name": appName,
  "icon": "fa-rocket",
  "isSystemObject": 0,
  "json": {
    "translations": [
      {
        "language_code": "en",
        "label": appName,
        "description": ""
      }
    ],
    "name": appName,
    "versionData": {
      "versionNumber": "1.0.0",
      "changeLog": {
        "1.0.0": {
          "author": "N/A",
          "version": "1.0.0",
          "keepVersion": 0,
          "commitMessage": "Initial Version",
          "timestamp": "2026-04-21T05:23:36.022Z",
          "versionNumber": "1.0.0"
        }
      }
    },
    "objectIDs": [],
    "objectListSettings": {
      "isOpen": false, "searchText": "",
      "sortDirection": "asc",
      "isGroup": false
    },
    "hintIDs": [],
    "queryIDs": [],
    "datacollectionIDs": [],
    "pageIDs": [],
    "processIDs": []
  },
  "roleAccess": [
    "6cc04894-a61b-4fb5-b3e5-b8c3f78bd331",
    "dd6c2d34-0982-48b7-bc44-2456474edbea",
    "e1be4d22-1d00-4c34-b205-ef84b8334b19",
    "ee52974b-5276-427f-ad4c-f29af6b5caaf"
  ],
  "translations": [
    {
      "language_code": "en",
      "label": "Test",
      "description": ""
    }
  ],
  "isAccessManaged": false,
  "isTranslationManaged": false,
  "isTutorialManaged": false,
  "accessManagers": {
    "useRole": 0,
    "role": null,
    "useAccount": 0,
    "account": null
  },
  "translationManagers": {
    "useRole": 0,
    "role": null,
    "useAccount": 0,
    "account": null
  },
  "tutorialManagers": {
    "useRole": 0,
    "role": null,
    "useAccount": 0,
    "account": null
  }
});

const objectFormat = JSON.stringify({
  "id": "",
  "type": "object",
  "name": "",
  "labelFormat": "",
  "labelSettings": {
    "isNoLabelDisplay": 0
  },
  "isImported": 0,
  "isExternal": 0,
  "tableName": "",
  "primaryColumnName": "uuid",
  "transColumnName": "",
  "urlPath": "",
  "objectWorkspace": {
    "sortFields": [],
    "filterConditions": [],
    "frozenColumnID": "",
    "hiddenFields": []
  },
  "isSystemObject": 0,
  "translations": [
    {
      "language_code": "en",
      "label": ""
    }
  ],
  "fieldIDs": [],
  "importedFieldIDs": [],
  "indexIDs": [],
  "createdInAppID": appID,
});

const fieldDateFormat = JSON.stringify({
  "id": "",
  "type": "field",
  "key": "date",
  "icon": "calendar",
  "isImported": 0,
  "columnName": "",
  "settings": {
    "showIcon": 1,
    "required": 0,
    "unique": 0,
    "validationRules": "[]",
    "dateFormat": 2,
    "defaultDate": 1,
    "defaultDateValue": null,
    "validateCondition": "none",
    "validateRangeUnit": "",
    "validateRangeBefore": 0,
    "validateRangeAfter": 0,
    "validateStartDate": null,
    "validateEndDate": null,
    "width": 130,
    "timeFormat": 2,
    "defaultTime": 1,
    "defaultTimeValue": null
  },
  "translations": [
    {
      "language_code": "en",
      "label": ""
    }
  ]
});

const fieldDatetimeFormat = JSON.stringify({
  "id": "",
  "type": "field",
  "key": "datetime",
  "icon": "clock-o",
  "isImported": 0,
  "columnName": "",
  "settings": {
    "showIcon": 1,
    "required": 0,
    "unique": 0,
    "validationRules": "[]",
    "dateFormat": 1,
    "defaultDate": 1,
    "defaultDateValue": null,
    "validateCondition": "none",
    "validateRangeUnit": "",
    "validateRangeBefore": 0,
    "validateRangeAfter": 0,
    "validateStartDate": null,
    "validateEndDate": null,
    "timeFormat": 2,
    "defaultTime": 1,
    "defaultTimeValue": null,
    "width": 170
  },
  "translations": [
    {
      "language_code": "en",
      "label": ""
    }
  ]
});

const fieldNumberFormat = JSON.stringify({
  "id": "",
  "type": "field",
  "key": "number",
  "icon": "hashtag",
  "isImported": 0,
  "columnName": "",
  "settings": {
    "showIcon": 1,
    "required": 0,
    "unique": 0,
    "validationRules": "[]",
    "default": "",
    "typeFormat": "none",
    "typeDecimals": "none",
    "typeDecimalPlaces": 0,
    "typeRounding": "none",
    "typeThousands": "none",
    "validation": 0,
    "validateMinimum": "",
    "validateMaximum": "",
    "width": 150
  },
  "translations": [
    {
      "language_code": "en",
      "label": ""
    }
  ]
});

const fieldStringFormat = JSON.stringify({
  "id": "",
  "type": "field",
  "key": "string",
  "icon": "font",
  "isImported": 0,
  "columnName": "",
  "settings": {
    "showIcon": 1,
    "required": 0,
    "unique": 0,
    "validationRules": "[]",
    "default": "",
    "maxLength": "",
    "supportMultilingual": 0,
    "width": 150
  },
  "translations": [
    {
      "language_code": "en",
      "label": ""
    }
  ]
});

const messages = [
  [
    "system",
    `
Your task is to generate MariaDB SQL statements. You must act as a precise data mapper.

### STRICT TEMPLATE ADHERENCE
You are provided with exact JSON templates for "application", "object", and "field".
- **DO NOT** remove any keys.
- **DO NOT** change the data types (e.g., if a value is 0, do not change it to false).
- **COPY** the structures exactly as provided in the constants below.
- Only update the specific IDs, names, and relationship arrays (objectIDs, fieldIDs) as required by the logic. DO NOT change the other json keys else.

### DATABASE SCHEMA (\`appbuilder_definition\`)
| Column | Type | Details |
| :--- | :--- | :--- |
| id | varchar(255) | UUIDv4 |
| json | longtext | The exact JSON string from templates below |
| type | varchar(255) | "application", "object", or "field" |

### DATA RELATIONSHIP ALGORITHM
1. **Fields First**: Generate \`INSERT\` for each field using the appropriate template below. Generate a unique UUID for each.
2. **Object Second**: Generate \`INSERT\` for the object.
   - **json.fieldIDs**: Must be an array of the UUIDs created in Step 1.
   - **json.createdInAppID**: Must match the App ID: {appID}.
3. **Application Update**: Generate \`UPDATE\` for the application (id: {appID}).
   - **json.objectIDs**: Must include the new Object UUID.
4. **Physical Table**: Generate \`CREATE TABLE\` using \`AB_{appName}_[object.name]\`.

### JSON TEMPLATES (MANDATORY STRUCTURE)
Use these variables as the source of truth for the "json" column:

Type "application":
{appFormat}

Type "object":
{objectFormat}

Type "field" (Date):
{fieldDateFormat}

Type "field" (Datetime):
{fieldDatetimeFormat}

Type "field" (Number):
{fieldNumberFormat}

Type "field" (String):
{fieldStringFormat}

### OUTPUT REQUIREMENTS
Return ONLY a raw JSON object. No markdown. Make sure strictly every SQL statement MUST end with ";".
{{
  "isValid": true,
  "sql": "INSERT...; INSERT...; CREATE TABLE...; UPDATE...;",
  "definitionIDs": [..."field" and "object" ids of the appbuilder_definition table],
  "message": "Confirmation text"
}}`
  ],
  [
    "user",
    "{userMessage}"
  ]
];

const agent = createAgent({
   model,
   tools: [],
})
let promptTemplate = ChatPromptTemplate.fromMessages(messages);
let chain = promptTemplate.pipe(model).pipe(new StringOutputParser());

console.log("Generating SQL...");

const res = await new Promise((resolve) => {
   let res;
   let errMessage;
   let prevOutput;
   const generate = async () => {
      try {
         const data = {
            dbName: `appbuilder-${tenantUUID}`,
            appID,
            appName,
            appFormat,
            objectFormat,
            fieldDateFormat,
            fieldDatetimeFormat,
            fieldNumberFormat,
            fieldStringFormat,
            userMessage,
            errMessage,
         };
         if (errMessage) data.errMessage = errMessage;
         if (prevOutput) data.prevOutput = prevOutput;
         res = await chain.invoke(data);
         resolve(JSON.parse(res));
      } catch (err) {
         console.error(err);
         errMessage = err.message;
         prevOutput = res;
         promptTemplate = ChatPromptTemplate.fromMessages(messages.concat([
            [
               "user",
`
This is your current output that is causing an error:

{prevOutput}

This is the error message:

{errMessage}

Please re-generate!
`
            ]
         ]));
         chain = promptTemplate.pipe(model).pipe(new StringOutputParser());
         console.log("Re-generating SQL...");
         generate();
      }
   };
   generate();
});

if (res.isValid) {
   const sql = res.sql.trim()
   await new Promise((resolve, reject) => {
      fs.writeFile("temp.sql", sql, (err) => {
         if (err) {
            reject(err);
            return;
          }
          resolve();
      });
   });
   console.log(sql);
   console.log('SQL File saved successfully!');
}
console.log(res);
return res;
};
