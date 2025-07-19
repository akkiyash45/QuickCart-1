import { Inngest } from "inngest";
import { connect } from "mongoose";
import connectDB from "./db";
import User from "@/models/User";

//create a client to send and receive events or messages
export const inngest = new Inngest({_id : "quickCart-next"})


//inngest functions that are used to save data in the database
 export const syncUserCreation = inngest.createFunction(
   { 
    id:'sync-user-from-clerk'
},
{
    event:'clerk/user.created'
},
async({event}) =>{
    const { id,first_name,last_name, email_address, image_url } = event.data
    const userData = {
        id:id,
        name:first_name + ' ' + last_name,
        email_address:email_address[0].email_address,
        image_url:image_url
    }
    await connectDB()
    await User.create(userData)
}

 )

 export const syncUserUpdation = inngest.createFunction(
   { 
    id:'update-user-from-clerk'
},
{
    event:'clerk/user.updated'
},
async({event}) =>{
    const { id,first_name,last_name, email_address, image_url } = event.data
    const userData = {
        id:id,
        name:first_name + ' ' + last_name,
        email_address:email_address[0].email_address,
        image_url:image_url
    }
    await connectDB()
    await User.findByIdandUpdate(id, userData)
}

 )

  export const syncUserDeletion = inngest.createFunction(
   { 
    id:'delete-user-with-clerk'
},
{
    event:'clerk/user.deleted'
},
async({event}) =>{
    const {id} = event.data
    await connectDB()
    await User.findByIdandDelete(id, userData)
}

 )