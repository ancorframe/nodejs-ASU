const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    data: {
      course: {
        type: Object,
        required: [true, "set course"],
      },
      group: {
        type: Object,
        required: [true, "set group"],
      },
      subgroup: {
        type: Object,
        required: [true, "set subgroup"],
      },
      mon: [
        {
          time: {
            type: String,
            required: [true, "set time"],
          },
          tag: {
            type: String,
            required: [true, "set tag"],
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
          },
          discipline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplines",
            required: true,
          },
        },
      ],
      tue: [
        {
          time: {
            type: String,
            required: [true, "set time"],
          },
          tag: {
            type: String,
            required: [true, "set tag"],
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
          },
          discipline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplines",
            required: true,
          },
        },
      ],
      wed: [
        {
          time: {
            type: String,
            required: [true, "set time"],
          },
          tag: {
            type: String,
            required: [true, "set tag"],
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
          },
          discipline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplines",
            required: true,
          },
        },
      ],
      thu: [
        {
          time: {
            type: String,
            required: [true, "set time"],
          },
          tag: {
            type: String,
            required: [true, "set tag"],
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
          },
          discipline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplines",
            required: true,
          },
        },
      ],
      fri: [
        {
          time: {
            type: String,
            required: [true, "set time"],
          },
          tag: {
            type: String,
            required: [true, "set tag"],
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
          },
          discipline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplines",
            required: true,
          },
        },
      ],
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
scheduleSchema.pre("save", function () {
  if (this.isNew) {
    this.createdBy = this.updatedBy;
  }
});

scheduleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = {
  Schedule,
};
