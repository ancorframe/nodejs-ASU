const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    data: {
      content: {
        type: String,
        required: [true, "Set content"],
      },
      books: [
        {
          title: {
            type: String,
            required: [true, "Set title"],
          },
          author: {
            type: String,
            required: [true, "Set author"],
          },
          source: {
            type: String,
            required: [true, "Set source"],
          },
          content: {
            type: String,
            required: [true, "Set content"],
          },
        },
      ],
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
  },
  { timestamps: true }
);
supportSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

supportSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});


const Support = mongoose.model("Support", supportSchema);

module.exports = {
  Support,
};
