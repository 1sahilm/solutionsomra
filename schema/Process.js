// import mongoose from 'mongoose';

// const TaskSchema = mongoose.Schema({
//   name:{type:String,required:false},
//   task_name:{type:String,required:false},
//   date:{type:Date,required:false},
//   bussiness_name:{type:String,required:false},
//   monthly_target_assign: { type: Number, required: false },
//   monthly_target_done: { type: Number, required: false },

  
//   monthly_base_target_assign: { type: Number, required: false },
//   monthly_base_target_done: { type: Number, required: false },
//   monthly_base_target_left: { type: Number, required: false },
//   valid_date: { type: Date, required: false },
  
  
//   category: { type: String, required: false },
//   type: { type: String, required: false },
//   timestamp: String,
// });

// const Task = mongoose?.models?.task || mongoose.model('task', TaskSchema);

// export default Task;

import mongoose from "mongoose"

const ProcessSchema=mongoose.Schema({
    process_id:{type:Number, required:false},
    process_name:{type:String,required:false},
    type:{type:String,required:false},
    timestamp:String
})
const Process=mongoose?.models?.process || mongoose.model('process',ProcessSchema);
export default Process;