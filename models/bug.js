const mongoose = require('mongoose');
const { Schema } = mongoose;

const bugSchema = new Schema({
    projectid: String,
    bname: String,
    bauthor: String,
    bdesc: String,
    tag: Array
}, { timestamps: true });

const bug = mongoose.model('bug', bugSchema);

module.exports = bug;