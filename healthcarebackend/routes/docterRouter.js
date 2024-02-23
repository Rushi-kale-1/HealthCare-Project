const express = require('express')
const {UserCred, DocterCred, DocterDocument, UserDocument, DocterBlog, DocterProfile} = require("../database/db");
const jwt = require("jsonwebtoken");
const docterMid = require("../middleware/docterMid");
const {docterupload} = require("../middleware/docterDocumentMulter");
const {docterprofileupload} = require("../middleware/docterprofilemulter");
const docterRouter = express()
key = "AniketBhai007"
function tokenMaker(data) {
    const token = jwt.sign({ username: data.username }, key);
    return token;
}
docterRouter.post("/signup", async (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    try {
        const existingUser = await DocterCred.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "Docter already exists" });
        }

        const createdUser = await DocterCred.create({ username, firstname, lastname, password });

        const token = tokenMaker({ username });
        res.json({ msg: 'Docter created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

docterRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await DocterCred.findOne({username,password});
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

docterRouter.post('/addinfo',docterMid,async (req,res)=>{
    const {gender,
        contactInfo1,
        contactInfo2,
        govId,
        mediDeg1,
        mediDeg2,
        mediDeg3,
        medSchool,
        professionalExp} = req.body

    try {
        const docterDocument = await DocterDocument.create({
            userId: req.userId,
            gender,
            contactInfo1,
            contactInfo2,
            govId,
            mediDeg1,
            mediDeg2,
            mediDeg3,
            medSchool,
            professionalExp
        });
        res.json({ msg: "successful" });
    } catch (error) {
        console.error('Error creating doctor document:', error);
        res.status(500).json({ msg: "Internal server error" });
    }

})

docterRouter.post('/addcertificates', docterMid, docterupload.single('file'), (req,res)=>{
    const userId = req.userId;
    if (!req.file){
        res.json({msg:"file not found"})
    }
    const { filename, mimetype, buffer } = req.file;

    const imageBase64 = buffer.toString('base64');
    DocterDocument.findOneAndUpdate(
        { userId },
        { $push: { certificates: { filename, contentType: mimetype, imageBase64 } } },

        { upsert: true, new: true }
    )
        .then((docterDocument) => {
            res.json({ msg: "Docter information and Certificates added successfully", docterDocument });
        })
        .catch((error) => {
            console.error('Error adding user info and image:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });
})

docterRouter.get("/certificates", docterMid,async (req,res)=>{
    try{
        const document = await DocterDocument.findOne({userId: req.userId})
        if (!document){
            res.json({msg:"no documnet found "})
        }
        res.json(document.certificates)

    }
    catch{
    res.json({msg:"internal Error"})
    }
})

docterRouter.post('/blog',docterMid, async (req,res)=>{


    try {
        const blog = await DocterBlog.create({
            userId: req.userId,
            title: req.body.title,
            data: req.body.data
        })
        if (!blog){
            res.json({msg:"not successful"})
        }
        res.json({msg:"successful"})
    }
    catch {
        res.json({msg:"Internal Server Error"})
    }
})
docterRouter.get('/getblog', async (req,res)=>{
    try{
        const allblogs = await DocterBlog.find({})
        if (!allblogs) {
            res.json({msg: "No blogs to show"})
        } else {
            res.json({blogs: {allblogs}})
        }
    }
    catch (err){
        res.json({msg:"internal server error"})
    }

})

docterRouter.post('/setdocterprofile',docterMid,docterprofileupload.single('file'),(req,res)=>{
    const userId = req.userId
    if (!req.file){
        res.json({msg:"file not found"})
    }
    const { filename, mimetype, buffer } = req.file;

    const imageBase64 = buffer.toString('base64');
    DocterProfile.findOne({userId})
        .then((data)=>{
            if (data){res.json({msg:"profile pic already set"})
            }
        })
        .catch(err=>{
            res.json({msg:"internal error"})
        })
    DocterProfile.create(
        {
            userId,
            profile: {filename, contentType: mimetype, imageBase64}
        }
    )
        .then((docterDocument) => {
            res.json({ msg: "Docter profile pic successfully" });
        })
        .catch((error) => {
            console.error('Error adding docter image:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });

})



module.exports = {docterRouter}