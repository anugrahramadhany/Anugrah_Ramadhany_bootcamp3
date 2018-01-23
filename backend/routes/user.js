
const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.get("/", (req, res) => {
    
    User.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error)
            console.log("1")
        } else {
            res.json(result)
            console.log("2")
        }
    })
})


router.post("/register", (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save((error) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.json(newUser)
        }
    })
})


router.post("/login", (req, res) => {
    User.findOne({ name: req.body.name, password: res.body.password }, (error, result) => {
        if (error) {
            res.status(500).json(error)
        } else if (!result) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            const payload = {
                id: result._id,
                name: result.name
            }
            const token = jwt.sign(payload, "secretkey",{ });
            res.json({token:token});
        }
    })
})

router.delete("/:id", (req, res) => {
    
    User.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json({ message : "Data deleted" })
        }
    });
    
});

module.exports = (function(){
    return router;
})();


