const express = require('express');
const { UserCred, UserDocument, DocterCred, DocterDocument, DocterRating, DocterProfile, DocterBlog} = require("../database/db");
const userRouter = express();
const jwt = require('jsonwebtoken');
const userMid = require("../middleware/userMid");
const {upload} = require("../middleware/userDocumentMulter");
const {readFileSync} = require("fs");
const {join} = require("path");
const key = "AniketBhaiLikesBhabhi";


function tokenMaker(data) {
    const token = jwt.sign({ username: data.username }, key);
    return token;
}

userRouter.post("/signup", async (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    try {
        const existingUser = await UserCred.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const createdUser = await UserCred.create({ username, firstname, lastname, password });

        const token = tokenMaker({ username });
        res.json({ msg: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserCred.findOne({ username,password });
        if (!user) {
            return res.status(401).json({ msg: "Wrong credentials" });
        }

        const token = tokenMaker({ username });
        res.json({ msg: "Logging successful", token });
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

userRouter.post("/addinfo",userMid,(req,res)=>{
    const userId = req.userId;
    const {height, weight, blood, age, physicalActivity,allergies}= req.body;
    UserDocument.create({userId, images:[],height, weight, blood, age, physicalActivity,allergies})
        .then((userDocumnet)=>{
            res.json({msg:"succesful"})
        })
        .catch(()=>{
            res.status(500).json({msg:'internal error'})
        })
})
userRouter.post("/addreport", userMid, upload.single('file'),(req, res) => {

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

    const { filename, mimetype, buffer } = req.file;

    const imageBase64 = buffer.toString('base64');

const userId =req.userId
        UserDocument.findOneAndUpdate(
        { userId },
        { $push: { images: { filename, contentType: mimetype, imageBase64 } } },

        { upsert: true, new: true }
    )
        .then((userDocument) => {
            res.json({ msg: "User information and image added successfully", userDocument });
        })
        .catch((error) => {
            console.error('Error adding user info and image:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });
});

userRouter.get('/reports', userMid, async (req,res)=>{
    try{
        const document = await UserDocument.findOne({userId:req.userId})
        if (!document){
            res.json({msg:"no document found"})
        }
        else{
            res.json(document.images)
        }
    }
    catch {
res.json({msg:"internal error"})
    }
})


userRouter.get('/doctors', userMid, async (req, res) => {
    try {
        const filter = req.query.filter || "";

        // Find all doctors whose first name or last name matches the filter
        const doctors = await DocterCred.find({
            $or: [
                { firstname: { $regex: filter, $options: 'i' } }, // Case-insensitive search for firstname
                { lastname: { $regex: filter, $options: 'i' } }   // Case-insensitive search for lastname
            ]
        });

        // Prepare an array to store details of all doctors
        const doctorDetails = [];

        // Iterate over each doctor and fetch their profile, document, and rating
        for (const doctor of doctors) {
            // Fetch the doctor's profile
            const docterProfile = await DocterProfile.findOne({ userId: doctor._id });

            // Fetch the doctor's document
            const docterDocument = await DocterDocument.findOne({ userId: doctor._id });

            // Fetch the doctor's rating
            const docterRating = await DocterRating.findOne({ userId: doctor._id });

            // Push the details of the doctor to the array
            doctorDetails.push({
                firstname: doctor.firstname,
                lastname: doctor.lastname,
                docterId: doctor._id,
                gender: docterDocument ? docterDocument.gender : '', // Ensure to handle null case
                mediDeg1: docterDocument ? docterDocument.mediDeg1 : '', // Ensure to handle null case
                mediDeg2: docterDocument ? docterDocument.mediDeg2 : '', // Ensure to handle null case
                mediDeg3: docterDocument ? docterDocument.mediDeg3 : '', // Ensure to handle null case
                rating: docterRating,
                professionalExp: docterDocument ? docterDocument.professionalExp : '', // Ensure to handle null case
                profile: docterProfile
            });
        }

        // Send the details of all matching doctors as a JSON response
        res.json(doctorDetails);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

userRouter.get('/getblog', async (req,res)=>{
    try{
        const allblogs = await DocterBlog.find({})
        if (!allblogs) {
            res.json({msg: "No blogs to show"})
        } else {
            res.json({blogs: {allblogs},name:{}})
        }
    }
    catch (err){
        res.json({msg:"internal server error"})
    }

})

userRouter.get('/docterbyid', userMid, (req,res)=>{
    const id = req.headers.docterid
    DocterCred.findOne({_id:id})
        .then ((value)=>{
            const name = value.firstname + " " + value.lastname
            res.json({name})
        })
        .catch((err)=>{
        res.json({msg:"internal error"})
    })
})


module.exports = { userRouter };
