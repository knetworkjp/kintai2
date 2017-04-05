myapp.controller('AppController', function($scope) {
    
    this.load = function(page) {
        console.log("AppController loading " + page);
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
      $scope.splitter.left.toggle();
    };
    
    this.changetab = function(tabId) {
      $scope.tabbar.setActiveTab(tabId);
      $scope.splitter.left.toggle();
    };
    
    this.navi = function(page) {
      $scope.tabNavigator.pushPage(page);
      $scope.splitter.left.toggle();
    };
    
    
    
    
    ons.ready(function() {
        // $scope.splitter.left.toggle();
        console.log("AppController1 is ready!");
    });
    
    
    //console.log("AppController1 is ready!");
    $scope.isConnect = true;

});

//console.log("AppController1 is ready!");