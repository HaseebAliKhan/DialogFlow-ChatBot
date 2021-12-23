const express = require('express');
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 5000


require('./routes/DialogFlowRoutes')(app);


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})