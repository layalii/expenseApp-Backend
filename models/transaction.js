const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    amount: Number,
    date: Date,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],
    type: { type: String, enum: ["EXPENSE", "REVENUE"] }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    minimize: false
  }
);

mongoose.model("Transaction", transactionSchema);
