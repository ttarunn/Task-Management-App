const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }

})
const User = mongoose.model("tasks",taskSchema);

module.exports = User;