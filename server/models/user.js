import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  //username: { type: String, required: ture },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id: { type: String },
  active: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;