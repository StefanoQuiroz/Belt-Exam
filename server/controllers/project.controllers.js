const Project = require('../models/projects.models');


const findProject = (req,res) => {
    Project.find({status: req.params.status})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const findSingleProject = (req,res) => {
    Project.findById(req.params.id)
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const createProject = (req,res) => {
    Project.findOne({project:req.body.project})
        .then(response => {
            if(response){
                res.json({error: true, message:"The project already exists"})
            } else {
                const project = req.body;
                project.status= 'BACKLOG'
                Project.create(req.body)
                    .then(result => res.json({data:result}))
                    .catch(error => {
                        res.json({error:error, message:"Something went wrong"});
                        res.sendStatus(500)
                    })
            }
        });
}

const updateProject = (req,res) => {
    Project.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500);
        })
}

const deleteProject = (req,res) => {
    Project.deleteOne({_id:req.params.id})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(202);
        })
}

module.exports = {findProject, findSingleProject, createProject, updateProject, deleteProject};