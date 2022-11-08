import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const verificationSchema = mongoose.Schema({
  //username: { type: String, required: ture },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true }
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;