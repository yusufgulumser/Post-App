const express = require("express");
const { requireSignIn } = require("../controllers/userController"); // Ensure correct function name
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController, // Correct the import name
} = require("../controllers/postController");

// Router object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POSTS
router.get("/get-all-post", getAllPostsController);

router.get("/get-user-post", requireSignIn, getUserPostsController);

router.delete("/delete-post/:id", requireSignIn, deletePostController);

router.put("/update-post/:id", requireSignIn, updatePostController);
// Export
module.exports = router;
