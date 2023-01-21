const secret= process.env.SECRET_PASSWORD;
const Calc=require("./calc.model")
const jwt=require("jsonwebtoken")
const express= require("express")
const app=express.Router()


let blackList=[]
const authMiddleware=async(req,res,next)=>{
    let token=req.body.headers["authorization"]
    console.log(req)
    if(!token){
        return res.status(401).send("You are not authorized")
    }
    if(blackList.includes(token)){
        return res.send(401).send("Token expired")
    }
    try{
        const verification = await jwt.verify(token,secret)
        console.log(verification)
        if(verification)
        {
            req.userId=verification._id
            console.log(req.userId)
            next()
        }
        else{
            res.send("Authentication Fail")
        }

    }catch(e){
        res.send(e.message)
    }
}
app.use(authMiddleware)
app.post("/",async(req,res)=>{
    let {AIA,AIR,TNY}=req.body.body
    
    let i=AIR/100
    let totalMaturityValue=AIA*((Math.pow(i+1,TNY)-1)/i)
    let totalInvestmentAmt=AIA*TNY
    let totalInterestGained=totalMaturityValue-totalInvestmentAmt
    console.log(req.userId)
    await Calc.create({
        annualInvestmentAmt:AIA,
        annualInvestmentRate:AIR,
        totalNumberOfYears:TNY,
        totalInvestmentAmt,
        totalInterestGained,
        totalMaturityValue,
        author:req.userId
    })

    return res.send({
        message:"calculated successfully",
        annualInvestmentAmt:AIA,
        annualInvestmentRate:AIR,
        totalNumberOfYears:TNY,
        totalInvestmentAmt,
        totalInterestGained,
        totalMaturityValue,
        author:req.userId
    })

  })

  module.exports=app