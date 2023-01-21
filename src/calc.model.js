const mongoose=require('mongoose');

const calcSchema=new mongoose.Schema({
    annualInvestmentAmt:{type:Number,required:true},
    annualInvestmentRate:{type:Number,required:true},
    totalNumberOfYears:{type:Number,required:true},
    totalInvestmentAmt:{type:Number,required:true},
    totalInterestGained:{type:Number,required:true},
    totalMaturityValue:{type:Number,required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true
    }
})

const Calc=mongoose.model("calc",calcSchema)

module.exports =Calc