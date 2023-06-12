const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
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
      content: {
        type: String,
        required: [true, "Set content"],
      },
      date: {
        type: String,
        required: [true, "Set date"],
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
    // posted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);
newsSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

newsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});


const News = mongoose.model("News", newsSchema);

module.exports = {
  News,
};
