import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
  username:{type:String,required:false},
  tasks:[{task_name:{type:String},checked:{type:Boolean,default:false}}],
  
  
  timestamp: String,
});

const Task = mongoose?.models?.task || mongoose.model('task', TaskSchema);

export default Task;