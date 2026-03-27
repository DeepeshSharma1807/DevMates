const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
       type: String,
       required: true, 
       maxLength: 50,
       minLength: 2,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
       type: Number,
       min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female","others"].includes(value)){
            throw new Error ("Gender is not valid")
        }
        }
        
    },
    photoUrl:{
         type: String,
         default : "https://static.thenounproject.com/png/4595376-200.png",
    },
    about:{
        type: String,
        default: 'this is the default text',
    },

    skills:{
        type: [String],
    }

},{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);