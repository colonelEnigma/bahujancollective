const express = require('express')
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/uploadfile');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const storyRoute = require('./routes/story');
// const clientRoute = require('./routes/clients');
const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 3001


mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected')
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}).catch(err =>
    console.log(`error while connecting DB`, err.message)
)

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", 'auth-token');
    next();
});

app.get('/', (req, res) => {
    res.send('welcome to bahujan')
})

app.use('/auth', authRoute);
app.use('/upload', uploadRoute);
app.use('/user', userRoute);
app.use('/story', storyRoute);
// app.use('/api/client', clientRoute);