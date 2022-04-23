const express = require('express')
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/uploadfile');
const morgan = require('morgan');
const userRoute = require('./routes/user');
// const clientRoute = require('./routes/clients');
const cors = require('cors');
const verifyToken = require('./helper/verifyToken');

require('dotenv').config()
const port = process.env.PORT || 3001


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

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.send('welcome to bahujan')
})

app.use('/auth', authRoute);
app.use('/upload', uploadRoute);
app.use('/user', userRoute);
// app.use('/api/client', clientRoute);