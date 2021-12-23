
const chatbot = require('../ChatBot/chatbot');

module.exports = app => {
    app.get('/',(req,res)=>{
        res.send({"hello":"There"})
    });
    app.post('/api/df-text-query',async(req,res)=>{
        try {
            let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
            
            res.send(responses[0].queryResult)
            
        } catch (error) {
            console.log(error)
        }
            
    });
    app.post('/api/df-event-query', async(req,res)=>{
        try {
            
            let responses = await chatbot.eventQuery(req.body.event, req.body.parameters)
            res.send(responses[0].queryResult)
        } catch (error) {
            console.log(error)
        }
    });
}