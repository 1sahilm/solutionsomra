import mongoose from "mongoose";
import timestamp from "time-stamp";

const MessageSchema=mongoose.Schema({
    message:{type:String,required:false},
   

},
{
    timestamps:true
}
)

const Message=mongoose?.models?.message || mongoose.model('message',MessageSchema)

export default Message