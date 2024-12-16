import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  updateMembership: {
    type: String,
    required: true,
  },
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;  // Correctly exporting as default
