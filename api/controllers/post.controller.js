import { errorHandler } from "../utils/errorhandler.js";
import Post from '../models/post.model.js'
 
export const create = async (req, res, next) => {
   
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin users can create users"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]+/g, "");

  // const newPost = new Post({
  //   title: req.body.title,
  //   content: req.body.content,
  //   slug,
  //   author: req.user._id
  // });
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
    createdAt: new Date(),
    author: req.user._id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error)
  }
};