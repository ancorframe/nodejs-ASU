const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    data: {
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

researchSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Research = mongoose.model("Research", researchSchema);

module.exports = {
  Research,
};
