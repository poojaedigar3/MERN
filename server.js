const express = require('express');
const mongoose = require('mongoose');
const School = require('./school');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var cors = require('cors');
const logger = require('morgan');

const API_PORT = 3002 || process.env.port;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dbRoute = 'mongodb+srv://<user>:<password>@cluster0-geckb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbRoute, {useNewUrlParser:true});
let db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.once('open',()=>{
    console.log("Connected to the database");

});


router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/getData',(request,response)=> {
    School.find((err, data) => {
        console.log("Inside find");
        if (err) return response.json({ success: false, error: err });
        return response.json({ success: true, data: data });
    });
});

router.put('/putData',(request,response)=>{
    response.send("Put Success");
});

router.put('/postData',(request,response)=>{
   // response.send("Post Success");
    let school  = new School();
    console.log("Inside request");
    const { id, firstname, lastname, age } = request.body;

        school.id=id;
        school.firstname=firstname;
        school.lastname=lastname;
        school.age=age;

    school.save((err) => {
        if (err) return response.json({ success: false, error: err });
        return response.json({ success: true });
    });
});

router.delete('/deleteData', (request, response) => {
    const { id } = request.body;
    School.findOneAndDelete(id, (err,data) => {
        if (err) return response.send(err);
        return response.json({ success: true });
    });
});

app.use('/api',router);
app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`));