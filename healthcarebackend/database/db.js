const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const UserCredSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})

const UserDocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCred'
    },
    images:[{
        filename: String,
        contentType: String,
        imageBase64: String
    }],
    age:String,
    blood:String,
    height:String,
    physicalActivity:String,
    weight:String,
    allergies:[String]

})
const DocterCredSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})

const DocterBlogSchema = new mongoose.Schema({
    userId:{
        ref:'DocterCred',
        type:mongoose.Schema.Types.ObjectId
    },
    title:String,
    data:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    cover:{
        filename:String,
        contentType:String,
        imageBase64:String
    }
})

const DocterDocumentSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocterCred'
    },
    gender:String,
    contactInfo1:String,
    contactInfo2:String,
    govId:String,
    mediDeg1:String,
    mediDeg2:String,
    mediDeg3:String,
    medSchool:String,
    professionalExp:String,
    certificates:[{
        filename: String,
        contentType: String,
        imageBase64: String
    }]

})

const DocterProfileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DocterCred'
    },
    profile:{
        filename: String,
        contentType: String,
        imageBase64: String
    }
})

const DocterRatingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DocterCred'
    },
ratingSum:Number,
    totalRating: Number,
    ratedUsers:[String]
})


const UserCred = mongoose.model('UserCred', UserCredSchema);
const UserDocument  = mongoose.model('UserDocument', UserDocumentSchema);
const DocterCred  = mongoose.model('DocterCred', DocterCredSchema);
const DocterDocument  = mongoose.model('DocterDocument', DocterDocumentSchema);
const DocterRating = mongoose.model('DocterRating',DocterRatingSchema )
const DocterBlog = mongoose.model('DocterBlog',DocterBlogSchema )
const DocterProfile = mongoose.model('DocterProfile',DocterProfileSchema )

module.exports = {UserCred, UserDocument, DocterCred, DocterDocument,DocterRating,DocterBlog,DocterProfile}