const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    pname: String,
    pauthor: String,
    pdesc: String,
    
}, { timestamps: true });


const project = mongoose.model('projects', projectSchema);

module.exports = project;