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
    maxlength: 500
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
    default: 'https://png.pngtree.com/png-clipart/20220222/original/pngtree-new-post-icon-giphy-instagram-png-image_7301792.png'
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