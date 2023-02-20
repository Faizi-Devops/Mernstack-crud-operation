const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/User')



const app = express();


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndexes:true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
    app.listen(4000, () => {
        console.log("Server is listening on port 4000");
    });
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});


app.use('/users',UserRoute)

// app.use('/address',addressRoute)
// app.use('/orders',UserRoute)
// app.use('/products',productRoute)
// app.use('/orders',orderRoute)


