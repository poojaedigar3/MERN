/*
const express = require('express');
const mongoose = require('mongoose');
const School = require('./school');
var cors = require('cors');
const app = express();
const router = express.Router();

const API_PORT = 3002 || process.env.port;
const dbRoute = 'mongodb+srv://pooja:poojadba@cluster0-geckb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbRoute, {useNewUrlParser:true});
let db = mongoose.connection;
db.once('open',()=>{
    console.log("Connected to the database");
});
//const School = mongoose.model('school', School);
router.get('/getData',(request,response)=> {
    Data.find((error,data)=> {
        if (error) return response.json({success: false, error: error});
        return response.json({success: true, data: data});
    });
});

router.put('/putData',(request,response)=>{
    response.send("Put Success");
});

router.post('/postData',(request,response)=>{
    response.send("Post Success");
});

router.delete('/deleteData',(request,response)=>{
    response.send("Delete Success");
});
app.use('/api',router);
app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`));


//data.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    age: Number
});

module.exports = mongoose.model("Data",DataSchema);*/