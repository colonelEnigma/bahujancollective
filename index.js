const express = require('express')
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
// const agencyRoute = require('./routes/agency');
// const clientRoute = require('./routes/clients');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected')
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch(err=>
    console.log(`error while connecting DB`, err.message)
)
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('welcome to bahujan')
})

app.use('/auth', authRoute);
// app.use('/api/agency', agencyRoute);
// app.use('/api/client', clientRoute);