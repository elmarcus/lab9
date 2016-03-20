
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');
require('./models/Comments');
var Comment = mongoose.model('Comment');
var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.log);
app.get('/board', routes.index);
app.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

app.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

app.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

app.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

app.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
