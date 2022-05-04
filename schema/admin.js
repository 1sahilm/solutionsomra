import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  phone: { type: Number,required:false},
  isSuperAdmin: { type: Boolean, required: true, default: false },
  task:{ type: Number ,required:false},
  status:{type: Boolean, required: false, default: true},
  timestamp: { type: Date, default: Date.now },
},
{
  timestamps:true,
});

const User = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default User;

