import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    
  },
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  image: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Post_%28South_Africa%29.gif'
  },
  category: {
    type: String,
    default: 'uncategorized'
  },
  slug: {
    type: String,
    unique: true
  },



}, { timestamps: true })
const Post = mongoose.model('Post', postSchema);

export default Post;