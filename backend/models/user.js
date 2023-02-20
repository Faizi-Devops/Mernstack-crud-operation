var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        default: ''
    },
    batch: {
        type: String,
        default: ''
    },
    year: {
        type:String,
        default:""
    }
});

var user = new mongoose.model('User', schema);

module.exports = user;