var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dummySchema = new Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("dummy", dummySchema);