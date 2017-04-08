myapp.controller('NameController', function($scope, $http) {
    $scope.resultajax
    
    ons.ready(function() {
        console.log("NameController is ready!");

        var parameter = {
                        Employee_ID:"1",
        }
        console.log("start ajax!")
        var url = "http://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_name/";
         $http({method: 'POST',
               url:url,
               parameter:{
                        "Employee_ID":"1",
        }
               }
          ).
          success(function(status, headers, config) {
             console.log(date); 
             console.log("ajax successed"); 
             $scope.resultajax="success";
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log("ajax failed");
             $scope.resultajax="failed";
          });
    });
    
});

//console.log("NameController is ready!");