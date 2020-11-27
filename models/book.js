const mongoose = require("mongoose");

//model for bookschema 
const BookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  bookName:{
    type: String,
    required: true,
  },
    bookIsbn:{
    type: String,
    required: true,
  },
    bookYear:{
    type: String,
    required: true,
    },
    bookAuthor:{
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

module.exports = mongoose.model("book", BookSchema);