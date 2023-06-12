const mongoose = require("mongoose");

const subgroupSchema = new mongoose.Schema(
  {
    data: {
      subgroup: {
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
subgroupSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

subgroupSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.unique;
  },
});

const Subgroup = mongoose.model("Subgroup", subgroupSchema);

module.exports = {
  Subgroup,
};
