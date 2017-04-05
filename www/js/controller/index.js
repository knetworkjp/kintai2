// This is a JavaScript file
myapp.controller("indexController", ["$scope", function($scope) {
            
            $scope.isConnect = true;
            $scope.jsonData = [];
            $scope.connect = function() {
                $scope.oauth.fetchRequestToken(function(url) {
console.log("Opening Request Token URL: " + url);
                    showAuthWindow(url);
                }, function(data) {
console.log(JSON.stringify(data));
                });
            };
}]);