import mongoose from 'mongoose';
import { ListGroup } from 'reactstrap';

const productSchema = mongoose.Schema({
  name:{type:String,required:false},
  agentId:{type:String,required:false},
  date:{type:Date,required:false},
  inputList:{type:Array,required:false},
  inputList1:{type:Array,required:false},
  images: { type: Array, required: false },

 
 
  total_no_of_calls: { type: Number, required: false },
  total_bussiness_connected: { type: Number, required: false },
  total_docs_received_today:{type:Number,required:false},
  total_catalog_created: { type: Number, required: false },
  inputList:{type:Array,required:false},
  inputList1:{type:Array,required:false},
  cataloge_created:{type:Array,required:false},
 
  total_approval_done_today: { type: String, required: false },
  inputList1:{type:Array,required:false},
  My_monthly_target_approved: { type: Number, required: false },
  target_left:{type:Number,required:false},

  My_monthly_target_Total_approved: { type: Number, required: false },
  


  total_number_product_created_today: { type: Number, required: false },
  til_date: { type: Number, required: false },
  Month_Aproved_til_Date:{ type:Number,required:false},
  total_number_product_approved_today: { type: Number, required: false },

  // Total created product till date
 
  
  category: { type: String, required: false },
  type: { type: String, required: false },
  timestamp: String,
},
{
  timestamps:true,
});

const Product = mongoose?.models?.agency || mongoose.model('agency', productSchema);

export default Product;

//=====================================================================================================================


