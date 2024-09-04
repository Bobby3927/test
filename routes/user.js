const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const usernamename = req.body.username;
    const password = req.body.password;

    //check whether already admin present?
    const response = await User.findOne({
        username : username,
    })
    if(response){
        res.status(403).json({
            msg : `User - ${username} already exist`
        })
    }
    else{
        await User.create({
            username,
            password
        })
        res.json({
            msg : "User created successfully!"
        })
    }

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router