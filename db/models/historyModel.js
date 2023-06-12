const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    data: {
      content: {
        type: String,
        required: [true, "Set content"],
      }
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
historySchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

historySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});


const History = mongoose.model("History", historySchema);

module.exports = {
  History,
};
