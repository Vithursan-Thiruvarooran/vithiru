import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
  //username: { type: String, required: ture },
  user: { type: String, required: true },
  code: { type: String, required: true }
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;