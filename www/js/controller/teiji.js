myapp.controller('TeijiController', function($scope, $http) {
    $scope.resultajax;
    $scope.inputarrival;
    $scope.inputleave;
    
    
    ons.ready(function() {
        console.log("TeijiController is ready!");

        var parameter = {
                        Employee_ID:"1",
        }
        console.log("start ajax!")
        
        $http({
         method: 'POST',
           url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_fixetime/",
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
            //var premonth = spbday[1];
            //var preday = spbday[2];
            console.log(data);
            var prearrival = data.Fixe_Time_start
            var preleave = data.Fixe_Time_end
            $scope.prearrival = prearrival;
            $scope.preleave = preleave;
        }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log(data);
             console.log(headers);
             console.log("ajax failed");
             $scope.resultajax="failed";
          });
    });
    
    
    
    this.click = function(){        
        var inputarrival = $scope.inputarrival;
        var inputleave = $scope.inputleave;
        console.log("inputarrival=" + inputarrival + " inputleave=" + inputleave);
        $http({
             method: 'POST',
               url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_sub_fixedtime/",
               data:{
                        "Employee_ID":"1","Profile_Data_Arrival":inputarrival,
                        "Profile_Data_Clock-out":inputleave
        }
               }
          ).
          success(function(data) {
             console.log(data); 
             //console.log(status);
             //console.log(headers);
             console.log("ajax successed"); 
             console.log(data);
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log(data);
             console.log(headers);
             console.log("ajax failed");
             $scope.resultajax="failed";
          });
    };
    
});







