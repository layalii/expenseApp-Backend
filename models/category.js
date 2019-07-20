const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    style: Object
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

mongoose.model("Category", categorySchema);
