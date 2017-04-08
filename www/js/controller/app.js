myapp.controller('AppController', ['$scope', '$interval', 'googleLogin', function($scope, $interval, googleLogin, googleCalendar, googlePlus) {

    this.load = function(page) {
        console.log("AppController loading " + page);
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
      $scope.splitter.left.toggle();
    };
    
    this.navi = function(page) {
      $scope.tabNavigator.pushPage(page);
      $scope.splitter.left.toggle();
    };
    
    
    this.currentUser = googleLogin.currentUser;

    this.logout = function() {
      // localStorage.setItem('user', null);
      // $scope.splitter.content.load("tabbar.html");
      $scope.splitter.left.close();
      firebase.auth().signOut();
    };
    
    ons.ready(function() {
        // console.log("googleLogin = " + googleLogin);
        
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("firebase.auth().onAuthStateChanged!");
          if (user) {
            console.log("login uid = " + user.uid);
            // ホーム画面に遷移
            //$scope.splitter.content.load('index.html');
            $scope.loggedin = true;
            console.log("loggedin=" + $scope.loggedin)
          } else {
            console.log("not logged in.");
            // ログイン画面に遷移
            //$scope.splitter.content.load('view/login.html');
            $scope.loggedin = false;
            console.log("loggedin=" + $scope.loggedin)
          } 
        });
        console.log("AppController is ready!");
    });
    
}]);

