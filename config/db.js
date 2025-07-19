// we create a config file that connect our project with database
//method of connecting to mongoDB using moongoose
import mongoose from 'mongoose';

let cached = global.mongoose;   //cached is the stored database connection
 if(!cached) {
    cached = global.mongoose = {conn : null , promise : null}
 }

 async function connectDB() {
    if (cached.conn){
        return cached.conn;
    }

    if (!cached.promise){
        const opts ={
            bufferCommands : false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(mongoose=>{
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
    
 }
 export default connectDB