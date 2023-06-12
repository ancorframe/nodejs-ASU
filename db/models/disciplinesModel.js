const mongoose = require("mongoose");

const disciplinesSchema = new mongoose.Schema(
  {
    data: {
      disciplines: {
        type: String,
        required: [true, "Set disciplines"],
      },
      course: {
        type: Array,
        required: [true, "Set course"],
      },
      specialty: {
        type: Array,
        required: [true, "Set specialty"],
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
disciplinesSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

disciplinesSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.unique;
  },
});

const Disciplines = mongoose.model("Disciplines", disciplinesSchema);

module.exports = {
  Disciplines,
};
