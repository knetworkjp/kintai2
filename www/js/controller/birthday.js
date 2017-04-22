myapp.controller('BirthdayController', function($scope, $http) {
    $scope.resultajax;
    $scope.inputmonth;
    $scope.inputday;
    
    
    ons.ready(function() {
        console.log("BirthdayController is ready!");

        console.log("start ajax!")
        console.log("user_uid = " + $scope.user_uid);
         $http({
             method: 'POST',
               url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_birthday/",
               data:{
                        "Employee_ID":$scope.user_uid,
                    }
               }
          ).
          success(function(data) {
             console.log(data); 
             //console.log(status);
             //console.log(headers);
             console.log("ajax successed"); 
             $scope.resultajax="success";
             var spbday = data.Birthday.split("-");
             var preyear = spbday[0];
             var premonth = spbday[1];
             var preday = spbday[2];
             console.log("preyear:" + preyear +" premonth:" + premonth + " preday:" + preday);
             $scope.preyear = preyear;
             $scope.premonth = premonth;
             $scope.preday = preday;
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
        var inputdate = $scope.inputyear + "-" + $scope.inputmonth + "-" + $scope.inputday;
        console.log(inputdate);
        $http({
             method: 'POST',
               url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_sub_birthday/",
               data:{
                        "Employee_ID":$scope.user_uid,"Profile_Data_Date_Changed":inputdate
        }
               }
          ).
          success(function(data) {
             console.log(data); 
             //console.log(status);
             //console.log(headers);
             console.log("ajax successed"); 
             console.log(data);
             $scope.resultajax="変更に成功しました。";
             console.log("resultajax=" + $scope.resultajax);
             ons.createDialog('view/d_birthday.html', {parentScope: $scope}).then(function(dialog) {
                dialog.show();
            });
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log(data);
             console.log(headers);
             $scope.resultajax="変更に失敗しました。もう一度お試しください。";
             console.log("resultajax=" + $scope.resultajax);
             ons.createDialog('view/d_birthday.html', {parentScope: $scope}).then(function(dialog) {
                dialog.show();
            });
        });
    };
    
});





