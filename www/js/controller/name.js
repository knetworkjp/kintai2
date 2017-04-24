myapp.controller('NameController', function($scope, $http) {
    $scope.resultajax;
    $scope.inputname;
    $scope.dialogs = {};
    
     
    
    
    ons.ready(function() {
        console.log("NameController is ready!");

        var parameter = {
            Employee_ID:"1",
        }
        console.log("start ajax!");
        //console.log("user_uid = " + $scope.user_uid);
        
        $http({
            method: 'POST',
            url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_call_name/",
            data:{
                "Employee_ID":$scope.user_uid,
            }
        }).
        success(function(data) {
            console.log(data); 
            //console.log(status);
            //console.log(headers);
            console.log("ajax successed"); 
            $scope.resultajax="success";
            var prenamae = data.Namae;
            console.log(prenamae);
            //$scope.$apply(function () {
                $scope.preusername = prenamae;
            //});
             
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
        console.log("inputname = " + $scope.inputname);
        var inputname = $scope.inputname
        $http({
             method: 'POST',
               url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/profile_sub_name/",
               data:{
                        "Employee_ID":$scope.user_uid,"Profile_Data_Name_Changed":inputname
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
             ons.createDialog('view/d_name.html', {parentScope: $scope}).then(function(dialog) {
                dialog.show();
            });
          }).
          error(function(data, status, headers, config) {
             console.log(status);
             console.log(data);
             console.log(headers);
             $scope.resultajax="変更に失敗しました。もう一度お試しください。";
             console.log("resultajax=" + $scope.resultajax);
             ons.createDialog('view/d_name.html', {parentScope: $scope}).then(function(dialog) {
                dialog.show();
            });
          });
    };
    
});


//console.log("NameController is ready!");