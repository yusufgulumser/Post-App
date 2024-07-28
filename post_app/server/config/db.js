const mongoose=require("mongoose")
const colors=require("colors")

const connectDb=async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`there is an error ${error}`.bgRed.white)
    }
}

module.exports=connectDb;