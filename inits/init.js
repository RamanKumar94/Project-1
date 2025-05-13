const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(res => {
    console.log("connection successful");
})
.catch(err => {
    console.log(err);
});

async function main() {
    mongoose.connect(MONGO_URL);
};

let categories = ["Trending","Mountains", "Camping", "Rooms", "Amazing Pools", "Iconic Cities", "Castles", "Farms", "Arctic", "Domes", "Boats"]
const initdb = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => (
        {...obj, 
            owner: "680a5a31c61713353f63777c",
            category: categories[Math.floor(Math.random() * categories.length)],
        }
    ));

    await Listing.insertMany(initdata.data);
    console.log("Data was saved to db");
};

initdb();