const mongoose = require("mongoose");

const partnershipSchema = new mongoose.Schema(
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
partnershipSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

partnershipSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Partnership = mongoose.model("Partnership", partnershipSchema);

const partnershipDetailSchema = new mongoose.Schema(
  {
    data: {
      title: {
        type: String,
        required: [true, "Set date"],
      },
      url: {
        type: String,
        required: [true, "Set date"],
      },
      image: {
        type: String,
        required: [true, "Set date"],
      },
      logo: {
        type: String,
        required: [true, "Set date"],
      },
      content: {
        type: String,
        required: [true, "Set date"],
      },
    },
    refer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partnership",
      required: true,
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
partnershipDetailSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

partnershipDetailSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const PartnershipDetail = mongoose.model(
  "PartnershipDetail",
  partnershipDetailSchema
);

module.exports = {
  Partnership,
  PartnershipDetail,
};
