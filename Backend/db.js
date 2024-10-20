// Here i will make a function to connect to the database
const mongoose  = require("mongoose")
const mongoURI = "mongodb://localhost:27017/SharingCalc"

const connectToMongo = async()=>{
    
    try{
        await mongoose.connect(mongoURI);
        console.log("Connection Successfull");
    }catch(e){
console.log("\n\t Failed to connect \t\n",e)
    }
}
const disconnectToMongo= async()=>{
    try{
await mongoose.disconnect();
console.log("Disconnected Successfully");
    }catch(e){
        console.log("Failed to Disconnect\n",e);
        
    }
}

module.exports = {connectToMongo,disconnectToMongo};

