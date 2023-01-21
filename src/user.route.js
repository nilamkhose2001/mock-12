const express=require("express")
const User=require("./user.model")
const jwt=require("jsonwebtoken")
const app=express.Router()
const secret= process.env.SECRET_PASSWORD;


app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({ email });

    if (user) {
        return res.send({ message: "user already exists,please login" });
      }

      await User.create({
        name,email,password
      })

      return res.status(201).send({
        message: "user created successfully",
        name,
        email,
        password,
      });
})

app.post("/login",async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(403).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          _id: user._id,
          email:user.email,
          password:user.password
        },
        secret,
    { expiresIn: "7 days" }
      );
    
      return res.send({ message: "login successful", token });
})

app.get("/getProfile/:id",async(req,res)=>{
          let id=req.params.id;
          let user=await User.findById(id);
          if(user){
            return res.send({ message: "user found", user})
          }
          else{
            return res.send({ message: "User not found"})
          }
})



app.get("/",async(req,res)=>{
    let user=await User.find()
    return res.send(user)
})

module.exports =app