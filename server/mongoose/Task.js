var mongoose = require('mongoose');

module.exports = mongoose.model('Task', mongoose.Schema({
  question: String,
  answer: String
}));
