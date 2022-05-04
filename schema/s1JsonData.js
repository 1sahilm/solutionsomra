
import mongoose from "mongoose"

const S1ProcessSchema=mongoose.Schema({
    // agentId:{type:String},
    // process_id:{type:Array, required:false},
    // process_name:{type:Array,required:false},
    Brand:{type:String,required:false},
    SID:{type:String,required:false},
    docid:{type:String,required:false},
    companyname:{type:String,required:false},
    Product_URL:{type:String,required:false},
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
const S1Process=mongoose?.models?.s1JsonData || mongoose.model('s1JsonData',S1ProcessSchema);
export default S1Process;