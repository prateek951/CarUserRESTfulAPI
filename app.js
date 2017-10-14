const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pro');
//INIT APP
const app = express();

app.use(helmet());

const users = require('./routes/users');
const cars = require('./routes/cars');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES

app.get('/',(req,res,next)=> {
    res.status(200).json({
        message: 'You requested the index page'
    });
});
app.use('/users', users);
app.use('/cars', cars);


app.use((req,res,next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=> {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //RESPONSE TO THE CLIENT
    res.status(status).json( {
        error: {
            message : error.message
        }
    });
    //RESPONSE TO THE DEVELOPER
    console.error(err);
});


//BIND THE PORT TO THE SERVER AT PORT 1337
const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Magic happens at port : ${port} `));

