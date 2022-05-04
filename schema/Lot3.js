
import mongoose from "mongoose"

const S1ProcessSchema=mongoose.Schema({
   
    Brand:{type:String,required:false},
    SID:{type:String,required:false},
    SID1:{type:String,required:false},
    docid:{type:String,required:false},
    TestID:{type:String,required:false},

    companyname:{type:String,required:false},
    Product_URL:{type:String,required:false},
    Contractor_Name:{type:String,required:false},
    priority:{type:String,required:false},
    Lot_type:{type:String,required:false},


    
    type:{type:String,required:false},
    timestamp:String
})
const S1Process=mongoose?.models?.s1_Lot3 || mongoose.model('s1_Lot3',S1ProcessSchema);
export default S1Process;