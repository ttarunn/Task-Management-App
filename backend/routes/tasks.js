const Task = require("../models/taskSchema");


const createTask = async(req,res) => {
    const { title, description } = req.body;
    if(title && description){
        const newTask = new Task({
            title:title,
            description:description,
            author:req.userEmail
        });
        
        newTask.save().then(response => {
            res.status(201).json({
                message:"Task Created",
                data:response
            })
        }).catch(err => {
            res.status(500).json({
                message:"Something Went Wrong!",
                err:err
            })
        })
    }else{
        res.status(400).json({
            message:"Filled all the required Fields."
        })
    }
    
};

const getTasks = async(req,res) => {


    const page = req.query.page;
    
    const postPerPage = 3;

    
    const user = req.userEmail;
    const id = req.params.id;
    
    let filter = {
        author:user,
    };
    if(id){
        filter = {
            _id:id,
            author:user
        }
    };
    const taskData = Task.find(filter);
    if(page){
        taskData.skip(postPerPage*(page-1)).limit(postPerPage);
    }

    taskData.then(result => {
        res.status(200).json({
            message:"Tasks Fetched Successfully!",
            tasks:result
        })
    }).catch(err => {
        res.status(501).json({
            message:"Unable to Fetch!",
            err:err
        })
    });
};


const updateTask = async(req, res) => {

    const filter = {
        _id: req.params.id,
        author:req.userEmail
    };

    const updatedTask = req.body;

    if(updateTask){
        Task.findOneAndUpdate(filter, updatedTask).then(result => {
            res.status(201).json({
                message: "Task Updated Succesfully!",
            })
        }).catch(err => {
            res.status(500).json({
                message: "Internal Server Error",
                err:err
            })
        })
    }else{
        res.status(400).json({
            message: "Unable to Update Task!",
            err:err
        })
    }
};


const deleteTask = async (req, res) => {
    const id = req.params.id;
    const filter = {
        _id: id,
        author:req.userEmail
    }
    Task.findOneAndDelete(filter).then(result => {
        res.status(201).json({
            message:"Task Deleted Successfully!"
        })
    }).catch(err => {
        res.status(401).json({
            message:"Unable to Delete Post!",
            err:err
        })
    })
};


module.exports = { createTask, getTasks, updateTask, deleteTask }