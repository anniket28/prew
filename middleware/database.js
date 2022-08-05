const mongoose=require('mongoose')
const config=require('../config.json')

// 
const connectDatabase=handler=>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(config.mongoURI)
    return handler(req,res)
}

export default connectDatabase