
angular.module('comment', [])
		
.controller('MainCtrl', [
  '$scope','$http', '$window',
  function($scope,$http,$window){


    $scope.userName = $window.sessionStorage.getItem("User"); 	
    $scope.comments = [];
    


    	
    $scope.setUserName = function(){

	$window.sessionStorage.setItem("User", $scope.formName);

};

    $scope.addComment = function() {
      		if($scope.formContent === '') { return; }
      		console.log("In addComment with "+$scope.formContent);
      		$scope.create({
        	title: $scope.formContent,
        	user: $scope.userName,
		upvotes: 0,
      });
      $scope.formContent = '';

    };
    
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });

    };

    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };
    
$scope.getAll = function() {
	return $http.get('/comments').success(function(data){
	console.log("GET ALL");      
	angular.copy(data, $scope.comments);
    });
  };

$scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };

$scope.getAll();
  }
]);
