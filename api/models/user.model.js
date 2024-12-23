import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  }, 
  email: {
    type: 'string',
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: 'string',
    required: true,
    minlength: 5
  },
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;