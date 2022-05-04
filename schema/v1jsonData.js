
import mongoose from "mongoose"

const V1ProcessSchema=mongoose.Schema({
    // agentId:{type:String},
    // process_id:{type:Array, required:false},
    // process_name:{type:Array,required:false},
    DocID:{type:String,required:false},
    CompanyName:{type:String,required:false},
    Area:{type:String,required:false},
    City:{type:String,required:false},
    State:{type:String,required:false},
    Contact_Mobile:{type:String,required:false},
    
    Contractor_Name:{type:String,required:false},

    // found_on_jd:{type:String,required:false},
    // jd_productLink:{type:String,required:false},
    // found_on_brandSite:{type:String,required:false},
    // brandSite_productLink:{type:String,required:false},
    // standard_product_name:{type:String,required:false},
    // remark:{type:String,required:false},
    // today_total_submission:{type:Number,required:false},
    // till_date_submission:{type:Number,required:false},
    
    type:{type:String,required:false},
    timestamp:String
})
const V1GetjsonData=mongoose?.models?.v1JsonData || mongoose.model('v1JsonData',V1ProcessSchema);
export default V1GetjsonData;