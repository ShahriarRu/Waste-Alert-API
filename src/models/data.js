const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    wasteType: {
      type: String,
    },

    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },

    image: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
dataSchema.methods.toJSON = function () {
  const data = this;
  const dataObject = data.toObject();

  delete dataObject.avatar;

  return dataObject;
};

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
