// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing =  require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main().then(() => {
//     console.log("connected to DB");
// }).catch(err => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// };


// const initDB =  async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) =>({...obj, owner : "6a1a9f25102b3da85fbaa701"}))
//     console.log("data was initialized");

// };
// initDB();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const owner = await User.findOne({});
    if(!owner) {
        console.log("No user found. Register a user first then run this script.");
        process.exit(1);
    }

    initData.data = initData.data.map((obj) => ({ ...obj, owner: owner._id }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    process.exit(0);
};

initDB();