import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { userId, postId, content } = req.body;
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'You cannot comment on this post' });
    }
    const newComment = new Comment({ userId, postId, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};