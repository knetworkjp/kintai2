myapp.controller('ProfMenuController', ['$scope',function($scope) {
    $scope.dialogs = {};
    
    $scope.show = function(dlg) {
        console.log("run_show_method");
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    };
    
    
    //console.log("Prof_MenuController is ready!");
    ons.ready(function() {
        console.log("Prof_MenuController is ready!");
    });
    
}]);
  
//console.log("Prof_MenuController is ready!");