const mongoose = require("mongoose");

const entrantsSchema = new mongoose.Schema(
  {
    data: {
      degree: {
        type: String,
        enum: ["bachelor", "magistracy", "postgraduate"],
        required: [true, "Set degree"],
        unique: true,
      },
      content: {
        type: String,
        required: [true, "Set content"],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

entrantsSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

entrantsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Entrants = mongoose.model("Entrants", entrantsSchema);

module.exports = {
  Entrants,
};
