const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolDataSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    age: Number
});

module.exports = mongoose.model('School',SchoolDataSchema);