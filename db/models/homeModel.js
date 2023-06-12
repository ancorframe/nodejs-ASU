const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    data: {
      image: {
        type: String,
        required: [true, "Set promo image"],
      },
      promoUrl: {
        type: String,
        required: [true, "Set URL"],
      },
      promoAlt: {
        type: String,
        required: [true, "Set URL"],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unique: {
      type: String,
      default: "unique",
      unique: true,
    },
  },
  { timestamps: true }
);

homeSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

homeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.unique;
  },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = {
  Home,
};
