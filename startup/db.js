const mongoose = require("mongoose");
const config = require("config");
const { Book } = require("../models/book");
const { User } = require("../models/user");

module.exports = function() {
  const db = config.get("db");
  mongoose.connect(db).then(async () => {
    console.info(`Connected to ${db}...`);
    // Book.find({}, "_id", (err, res) => {
    //   console.log(res.length);
    //   res.forEach(obj => updateDoc(obj._id));
    // });
  });
};

function updateDoc(id) {
  //  console.log(id);
  if (id === undefined) return;
  Book.findById(id, function(err, doc) {
    if (err) console.log(err);
    doc.rate = getRnd(0, 1, 11);
    doc.save(() => {});
  });
}
function getRnd(p, min, max) {
  return Number((Math.random() * max + min).toFixed(p));
}
