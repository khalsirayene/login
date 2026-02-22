const express=require("express");
const mongoose=require("mongoose");
const path=require("path");

const app=express();
app.use(express.json());


app.set("view-engine",'ejs');
app.use(express.static("views"))
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

mongoose.connect('mongodb://127.0.0.1:27017/testDB').then(()=>{
console.log("db connect");
}).catch(()=>{
    console.log("connection failled!!");
})
//schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const user=mongoose.model("user",userSchema);
const port=5000;

 app.post("/add-user",async(req,res)=>{{
try{
    const{name,email,password}=req.body;
    const newUser=new user({name,email,password});
    await newUser.save();
    res.send("user saved");
} catch(error){
res.send("error");
}}})




















app.listen(port, () =>{
console.log("server is started in port "+port);
console.log("http://localhost:"+port+"/login.html");

    
})