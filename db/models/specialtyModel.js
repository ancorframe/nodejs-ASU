const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema(
  {
    data: {
      specialty: {
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
specialtySchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

specialtySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
      delete ret._id;
      delete ret.unique;
  },
});

const Specialty = mongoose.model("Specialty", specialtySchema);

module.exports = {
  Specialty,
};
