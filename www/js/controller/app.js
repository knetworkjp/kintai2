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
    
    this.isLogin = function() {
        var user = firebase.auth().currentUser;
        if(user) {//console.log("loggedin");
            //console.log(user.uid)
            return true;
        } else {console.log("notloggedin")
            return false;
        }
    };
    
    
    ons.ready(function() {
        // console.log("googleLogin = " + googleLogin);
        
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("firebase.auth().onAuthStateChanged!");


          /*if (user) {
            console.log("login uid = " + user.uid);
            // ホーム画面に遷移
            $scope.splitter.content.load('index.html');
            this.loggedin = true;
            console.log("loggedin=" + this.loggedin)
          } else {
            console.log("not logged in.");
            // ログイン画面に遷移
            $scope.splitter.content.load('view/login.html');
            this.loggedin = false;
            console.log("loggedin=" + this.loggedin)
          } */
        });

        console.log("AppController is ready!");
    });
    
}]);

