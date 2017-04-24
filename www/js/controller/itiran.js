myapp.controller('ItiranController', ['$scope','$http',function($scope,$http) {
    
    this.updateTime = 0;
    
    this.showPage = function(currentTab){
        console.log("ItiranController showPage is called tab = " + currentTab);
        
        // 現在のUNIX時間(秒)を取得する
        var date = new Date();
        var unixTime = Math.floor( date.getTime() / 1000 ) ;
        // 一定時間経過していれば更新する
        if(currentTab == 2 && unixTime - this.updateTime > 180) {
            console.log("ItiranController update list.");
            $scope.itiranList();
            // 更新時刻をセット
            this.updateTime = unixTime;
        }
        
        // trueを返却する(ng-showの戻り値)
        return true;
    }
    
    $scope.itiranList = function(){
        
        var user = firebase.auth().currentUser; // 現在ログインしているユーザを取得
        var usercode;
        if (user != null) {
            usercode = user.uid; // Firebaseのuser_uidを取得
        }
        console.log('GET user_uid = ' + usercode);
        
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var yyyymm = year+'-'+month;
        console.log(yyyymm);
        
        //APIで値を取得
        console.log("ruikeiData start ajax!");
        var parameter = {
            Employee_ID:usercode,
            Month:yyyymm
        }
        console.log('!start!=' + JSON.stringify(parameter));
        
        $http({
            method:'POST',
            url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/kintai_ruikei/",
            data:{
                "Employee_ID":usercode,
                "Month":yyyymm
            }
        })
        .success(function(data) {
            console.log(data);
            console.log("ajax successed"); 
            $scope.resultajax="success";
            var objRuikei = data;
            console.log(objRuikei);
        })
        .error(function(data, status, headers, config) {
            console.log(status);
            console.log(data);
            console.log(headers);
            console.log("ajax failed");
            $scope.resultajax="failed";
        });
        
        /*
        // APIで値を取得想定(とりあえずベタ書き)
        var objRuikei = {'totalWorkdays':'10',
                        'totalWorktime':'120.0',
                        'totalBreaktime':'100',
                        'totalOvertime':'00:00',
                        'totalLate':'0',
                        'totalLeaveEarly':'0'};
        //console.log(objRuikei);
        */
        
        //勤務時間を分割
        var totalworkH = objRuikei.totalWorktime;
        time = totalworkH.split(":"); //n:nn
        //time = Math.floor(totalworkH); //n.n

        // 勤務時間 > 出勤日数*12の場合は注意文表示
        var totaldays = objRuikei.totalWorkdays*12;
        var comment = "";
        var classname = "";
        if (totaldays <= time[0]) {
            comment = "働きすぎですよ!!(｀・д・)σﾒｯ!";
            classname = "over";
        } else {
            classname = "default";
        }
        
        $scope.totalWorkdays = objRuikei.totalWorkdays;
        $scope.totalWorktime = objRuikei.totalWorktime;
        $scope.overWorkComment = comment;
        $scope.className = classname;
        $scope.totalBreaktime = objRuikei.totalBreaktime;
        $scope.totalOvertime = objRuikei.totalOvertime;
        $scope.totalLate = objRuikei.totalLate;
        $scope.totalLeaveEarly = objRuikei.totalLeaveEarly;
        
    }

    ons.ready(function() {
        $scope.itiranList();
        console.log("IchiranController is ready!");
    });
}]);