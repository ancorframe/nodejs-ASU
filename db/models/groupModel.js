const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    data: {
      group: {
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
groupSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

groupSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
      delete ret._id;
      delete ret.unique;
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = {
  Group,
};
