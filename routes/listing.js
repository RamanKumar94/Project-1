const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer( {storage});


router
.route("/")
.get(warpAsync(listingController.index))                                     
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing, 
    warpAsync(listingController.createListing)
);      


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
.route("/:id")
.get(warpAsync(listingController.showListing))
.patch(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, warpAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, warpAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditForm));

module.exports = router;