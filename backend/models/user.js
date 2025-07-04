import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
}, {
  timestamps: true,
});
userSchema.pre('save',async function(next){
  if(!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
  next(); 
})

userSchema.methods.matchPassword = async function (EnteredPassword){
  return await bcrypt.compare(EnteredPassword,this.password);
}
export default mongoose.model('User',userSchema);