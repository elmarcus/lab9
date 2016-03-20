
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('index.html', { root: 'public' })
};


exports.log = function(req, res){
  res.sendfile('login.html', {root: 'public'})
};
