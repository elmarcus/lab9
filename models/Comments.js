var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  user: String, 
  title: String,
  upvotes: {type: Number, default: 0},
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);





