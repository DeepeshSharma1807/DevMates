const express = require("express");
const connectionDb = require('./config/database');
const User = require('./models/user');
const { ReturnDocument } = require("mongodb");
// const {adminAuth , userAuth} = require("./middleWares/auth")

const app = express();
app.use(express.json())

app.post("/signup", async (req,res)=>{
    const user = new User(req.body)
    console.log(user)
    
    try{
        await user.save();
        res.send("User Added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user"+ err.message)
    }
})

app.get("/user", async(req,res)=>{
    const userEmail = req.body.email;
     const users =  await User.find({email: userEmail})
     res.send(users);
})

app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({email : "deep@gmail.com" })
        if(users.length === 0){
            res.status(400).send("User not found")
        }
        else{
            res.send(users)
        }

    }
    catch(err){
        res.status(err).send("Something went wrong!!!")
    }
      
})

   app.get("/findOne", async(req, res)=>{
        try{
        const user = await User.findOne({email : "vk@gm.com"});
        res.send(user)
        }
        catch(err){
            res.status(400).send("Error Caused: "+ err.message)
        }
    })
    app.patch("/user/:userId", async (req,res)=>{

        

        const userId = req.params?.userId;
        const data = req.body;
        try{
            await User.findByIdAndUpdate({_id: userId} , data , {
                returnDocument : "after",
                runValidators : true,
            })
            res.send("User updated successfully of the given ID")
        }
        catch(err){
              res.send("User can't be updated")
        }
    })
    
    




connectionDb()
    .then(() => {
        console.log("Database connection has established");
        app.listen(3100, () => {
            console.log("Server is successfully listening on port 3100...")
        })
    })
    .catch((err) => {
        console.error("connection failed");
    })

// app.use("/admin", adminAuth)

// app.get("/user" , userAuth , (req , res)=>{
//        res.send("user data fetched successfully!")
// })


//     app.get("/admin/getAllData", (req, res)=>{
//         res.send("get all data")
//     })
//     app.get("/admin/deleteUser", (req,res)=>{
//         res.send("user deleted successfully ")
//     })





