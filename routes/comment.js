const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const commentController = require("../controllers/commentController");

router.post("/:watchId/comments", commentController.createComment);
router.get("/:watchId/comments", commentController.getAllComments);
router.get("/:watchId/comments/:commentId", commentController.getByIDComments);
router.put("/:watchId/comments/:commentId", commentController.updateComment);
router.delete("/:watchId/comments/:commentId", commentController.deleteComment);

module.exports = router;
