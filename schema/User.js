import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isSuperAdmin: { type: Boolean, required: true, default: false },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default User;
