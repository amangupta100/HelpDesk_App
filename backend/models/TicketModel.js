const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'authorRole' // 👈 dynamic reference
  },
  authorRole: {
    type: String,
    enum: ['User', 'Agent'], // 👈 model names
    required: true
  },
  timestamp: { type: Date, default: Date.now },
  attachment: { type: String }
});


const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    attachment: {
      type: String, // URL or path of the uploaded file
      default: null,
    },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Closed'],
      default: 'Active',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: [noteSchema],
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  });
  

module.exports = mongoose.model('ticket', ticketSchema);
