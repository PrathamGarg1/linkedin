import { User } from "@/types/user";
import mongoose, { Schema } from "mongoose";

export interface Comment{
    user:User,
    text:string,
    
}
const commentSchema=new Schema<Comment>({
    user : {
        userId:{type:String,required:true},
        userImage:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String}
    },
    text:{type:String,required:true},
})

export const Comment = mongoose.models.Comment || mongoose.model<Comment>("Comment", commentSchema);