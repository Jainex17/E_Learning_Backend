const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter course title"],
        minLength:[10,"Title should have more then 4 charaters"],
        maxLength:[30,"title cannot exceed 30 characters"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter course description"],    
        minLength:[20,"description should have more then 20 charaters"]
    },
    price:{
        type:Number,
        required:[true,"please enter course price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    lectures:[
    {
        title:{
            type:String,
        },
        desc:{
            type:String,
        }, 
        video:[
            {
                public_id:{
                    type:String
                },
                url:{
                    type:String
                }
            }
        ],    
    }
],
    poster:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    views:{
        type:Number,
        default:0,
    },
    noOfVideos:{
        type:Number,
        default:0,
    },
    catagory:{
        type:String,
        required:[true,"please enter course catagory"]
    },
    active:{
        type:Boolean,
        default:true,
    },
    // rating:{
    //     type:Number,
    //     default:0
    // },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true        
            },
            rating:{
                type:String,
                required:true        
            },
            Comment:{
                type:String,
                required:true        
            }
        }
    ],
    createBy:[
        {
            creatorid:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Course",courseSchema);