const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const adminname = req.body.adminname;
    const password = req.body.password;

    //check whether already admin present?
    const response = await Admin.findOne({
        adminname : adminname,
    })
    if(response){
        res.status(403).json({
            msg : `Admin - ${adminname} already exist`
        })
    }
    else{
        await Admin.create({
            adminname,
            password
        })
        res.json({
            msg : "Admin created successfully!"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const adminname = req.body.adminname;
    const password = req.body.password; 

    const userExist = await Admin.find({
        adminname : adminname,
        password : password
    })
    if(userExist){
        const token = jwt.sign({
            adminname
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            message : "Invalid input"
        });
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const response = await Course.findOne({
        title : title,
        price : price
    })
    console.log("Response : " ,response)
    if(response){
        res.status(403).json({
            message : "Course is already exist"
        })
    }
    else{
        const newcourse = await Course.create({
            title : title,
            description : description,
            price : price,
            imageLink : imageLink
        })
        res.json({
            message : "Course created successfully",
            courseId : newcourse._id
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({   
    })
    res.json({
        courses : courses
    })
});

module.exports = router;