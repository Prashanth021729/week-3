const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const user = req.body.username;
    const pass = req.body.password;
    const userExist = await User.findOne({user});
    if(!userExist){
        User.create({
            username:user,
            password:pass
        });
        res.status(200).json({
            msg: "User created successfully "
        })
    }else{
        res.status(400).json({msg:"user exists"})
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({courses: response});
    

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.json({msg: "Purchase complete"})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.params.username;
    
    const user = await User.findOne({username});

    const courses =  await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }

    });
    res.json({courses: courses});
});

module.exports = router