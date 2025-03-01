const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin }= require('../db');
const {Course }= require('../db');
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username =  req.body.username;
    const password = req.body.password;
    Admin.findOne({username}).then((value)=>{
        if(value){
            return res.status(400).json({msg: "user already exists"})
        }
        Admin.create({
            username:username,
            password:password
        }).then((value)=>{
            if(value){
                res.status(200).json({
                    msg: "user signed up"
                })
            }else{
                res.status(404).json({
                    msg: "Unable to signup, try again"
                })
            }
        })
    });
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    /* title:String,
    description:String,
    imageLink:String,
    price:Number*/
    const {title, description, imageLink, price }= req.body;
    const existingCourse = Course.findOne({title});
    if(existingCourse){
        return res.status(500).json({msg : "Course already Exists"})
    }

    Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    }).then((value)=>{
        if(value){
            res.status(201).json({msg: "course created....."})
        }else{
            res.status(500).json({msg:"unexpected Error"})
        }
    })


});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const title = req.query.title;

    const findDetails = await Course.find({title})
    if(findDetails){
        return res.status(200).json({
            msg: `The ${findDetails.title} is ${findDetails.description} ${findDetails.imageLink} at ${findDetails.price} inr`
        })
    }else{
        res.status(500).json({
            msg: 'Course doesnt exist'
        })
    }
});

module.exports = router;