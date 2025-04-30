const express = require("express");
const router = express.Router({mergeParams: true});
const warpAsync = require("../utils/warpAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews.js");


// Create Reviews Routes
router.post("/", isLoggedIn, validateReview, warpAsync(reviewController.createReview));

// Delete Reviews Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, warpAsync(reviewController.destroyReview));

module.exports = router;