myapp.controller('NameController', function($scope, $http) {
    $scope.resultajax
    
    ons.ready(function() {
        console.log("NameController is ready!");

        var parameter = {
                        Employee_ID:"1",
        }
        console.log("start ajax!")
        var url = "https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_name/";
         $http({//withCredentials: true,
             method: 'POST',
               url:url,
               data:{
                        "Employee_ID":"1",
        }
               }
          ).
          success(function(data) {
             console.log(data); 
             //console.log(status);
             //console.log(headers);
             console.log("ajax successed"); 
             $scope.resultajax="success";
             console.log(data.Namae);
             $scope.preusername = data
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log(data);
             console.log(headers);
             console.log("ajax failed");
             $scope.resultajax="failed";
          });
    });
    
});

//console.log("NameController is ready!");