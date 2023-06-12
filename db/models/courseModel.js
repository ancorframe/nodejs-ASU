const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    data: {
      course: {
        type: Array,
        default: [],
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
    unique: {
      type: String,
      default: "unique",
      unique: true,
    },
  },
  { timestamps: true }
);
courseSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

courseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
      delete ret._id;
      delete ret.unique;
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Course,
};
