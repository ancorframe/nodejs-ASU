const mongoose = require("mongoose");

const literatureSchema = new mongoose.Schema(
  {
    data: {
      title: {
        type: String,
        required: [true, "Set title"],
      },
      image: {
        type: String,
        required: [true, "Set image"],
      },
      author: {
        type: String,
        required: [true, "Set author"],
      },
      specialty: {
        type: Array,
        required: [true, "Set specialty"],
      },
      url: {
        type: String,
        required: [true, "Set url"],
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


literatureSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

literatureSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Literature = mongoose.model("Literature", literatureSchema);

module.exports = {
  Literature,
};
