const mongoose = require("mongoose");

const whitelistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

whitelistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Whitelist = mongoose.model("WhiteList", whitelistSchema);

module.exports = { Whitelist };
