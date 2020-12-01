
const User = require("./userModel");
const Image = require("./imageModel");

const mongoose = require("mongoose");
const fs = require('fs');
const Grid = require('gridfs-stream');
const ONE_DAY_MILLISECONDS = 86400000;

exports.registerNewUser = async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: null
        })
        
        user.password = await user.hashPassword(req.body.password);
        let createdUser = await user.save();
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.loginUser = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let user = await User.findOne({
            email: login.email
        });
        //Check user exists
        if (!user) {
            res.status(400).json({
                type: 'Not Found',
                msg: "Wrong login details."
            })
        }

        let match = await user.compareUserPassword(login.password, user.password);

        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: ONE_DAY_MILLISECONDS
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {
            res.status(400).json({
                types: "Not Found",
                msg: "Wrong Login Details :("
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "AHH Something Went Wrong!",
            msg: err
        })
    }
}


exports.userList = async (req, res) => {
    //console.log(req.userData.user._id)
    console.log('User List')
    User.findOne({ _id: new mongoose.Types.ObjectId(req.userData.user._id) }).then(data => {
        res.status(200).json({
          message: "User list retrieved successfully!",
          user: data
        });
      }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
}

exports.imageList = async (req, res) => {
    //console.log(req.userData.user._id)
    console.log('Image List')
    Image.find({ createdBy: new mongoose.Types.ObjectId(req.userData.user._id) }).then(data => {
        res.status(200).json({
          message: "Image list retrieved successfully!",
          images: data.reverse()
        });
      }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
}

exports.uploadImage = async (req, res) => {
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    let user_id = localStorage.getItem("Id");
    let user = await User.findOne({
        _id: user_id
    });

    user.update({ id: localStorage.getItem('Id') },
        { $push: { images: reqFiles } }).then(result => {
            console.log(result);
            res.status(201).json({
                message: "Done upload!",
                userCreated: {
                    _id: result._id,
                    images: result.images
                }
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        })
}