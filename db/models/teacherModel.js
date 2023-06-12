const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    data: {
      fullName: {
        type: String,
        required: [true, "Set full name"],
      },
      degree: {
        type: String,
        required: [true, "Set degree"],
      },
      image: {
        type: String,
        required: [true, "Set image"],
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

teacherSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
};
