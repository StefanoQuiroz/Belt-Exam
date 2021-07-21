const User = require('../models/schema.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt.config');

const findUser = (req,res) => {
    User.find({})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const findSingleUser = (req,res) => {
    User.findById(req.params.id)
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const createUser = (req,res) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result){
                res.json({error: true, message:"The emails is registered"})
            } else {
                User.create(req.body)
                    .then(result => res.json({data:result}))
                    .catch(error => {
                        res.json({error:error, message:"Something went wrong"});
                        res.sendStatus(500)
                    })
            }
        });
}

const updateUser = (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500);
        })
}

const deleteUser = (req,res) => {
    User.deleteOne({_id:req.params.id})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(202);
        })
}

const login = (req, res) => {
    User.findOne({email: req.body.email})
         .then(result => {
            if(result === null){
                res.json({error: true, message: "User not exists"})
            } else {
                bcrypt.compare(req.body.password, result.password)
                    .then(isValid => {
                        if(isValid){
                            const payload = {
                                _id: result._id,
                                userName: result.userName,
                                email: result.email
                            }
                            const token = jwt.sign(payload, secretKey);
                            res.cookie("usertoken", token, secretKey, {httpOnly: true})
                                .json({message:"logIn", data: payload})

                        } else {
                            res.json({error: true, message: "Invalidate password"})
                        }

                    })
                    .catch(err => res.json({
                        error: err, message:"User and passwords invalidate"
                    }))
            }
         })
         .catch(err => {
             res.json({error: err, message: "User or password invalidate"});
         })
}

module.exports = {findUser, findSingleUser, createUser, updateUser, deleteUser, login};