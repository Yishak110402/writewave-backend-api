const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'A post must have a title'],
        trim: true
    },
    content:{
        type:String,
        required:[true,'A post must have a content'],
        trim: true
    },
    createdAt: Date,
    lastEditted:Date,
    createdBy:{
        type:String,
        required:[true,'A post must have an owner'],
        trim: true
    },
    creatorName:{
        type:String,
        required:true,
        trim: true
    },
    comments: [
        {
            commentor:{
                type: String
            },
            commentContent:{
                type: String
            }
        }
    ]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post