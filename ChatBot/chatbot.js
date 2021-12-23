'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('structjson')

const projectID = config.googleProjectID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};


const sessionClient = new dialogflow.SessionsClient({
  projectID, credentials
})

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID); 

module.exports = {
    textQuery: async function(text, parameters = {}){
      try {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
          };
            let responses = await sessionClient.detectIntent(request);
          responses = await self.handleAction(responses);
          return responses;  
          } catch (error) {
            console.error(error);
          }
          // Send request and log result
          
    },
    eventQuery: async function(event, parameters = {}){
      try {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
              event: {
                // The query to send to the dialogflow agent
                name: event,
                parameters:structjson.structProtoToJson(parameters),
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },
          };
         
          // Send request and log result
            let responses = await sessionClient.detectIntent(request);
          responses = await self.handleAction(responses);
          return responses;  
          } catch (error) {
            console.error(error);
          }
          
    },

    handleAction: async function(responses){
        return responses
    }
} 