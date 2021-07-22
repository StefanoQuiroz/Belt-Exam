const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    project : {
        type: String,
        required: [true, "The name project is required"],
        minlength: [3, "The Project name must be at least 3 characters  or longer"]
    },
    dueDate: {
        type: String,
        required : [true, "Due Date is required"]
    }
    
}, {timestamps:true});


const Project = mongoose.model("Projects", ProjectSchema);

module.exports = Project;