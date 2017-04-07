myapp.controller('NameController', function($scope, $http) {
    
    ons.ready(function() {
        console.log("NameController is ready!");

        var parameter = {
                        Employee_ID:"1",
        }
        console.log("start ajax!")
        var url = "http://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_name/" + '&callback=JSON_CALLBACK';
         $http({method: 'POST',
               url:url,
               params: parameter}
          ).
          success(function(status, headers, config) {
             console.log(date); 
             console.log("ajax successed"); 
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log("ajax failed");
          });
    });
    
});

//console.log("NameController is ready!");