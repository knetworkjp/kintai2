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
        /*
        //APIで値を取得
        console.log("ruikeiData start ajax!");
        var url = "https://labo.ef-4.co.jp/deepblue/kintaiApp/kintai_ruikei/";
        $http({
                method: 'POST',
                url:url,
                data:{ // とりあえずベタ書き
                    "Employee_ID":"1",
                    "Month":"2017-04-15 10:00:00"
                }
        })
        .success(function(data) {
            console.log(data);
            console.log("ajax successed"); 
            $scope.resultajax="success";
            // $scope.preusername = data;
        })
        .error(function(data, status, headers, config) {
            console.log(status);
            console.log(data);
            console.log(headers);
            console.log("ajax failed");
            $scope.resultajax="failed";
        });
        */
        
        // APIで値を取得想定(とりあえずベタ書き)
        var objRuikei = {'totalWorkdays':'10',
                        'totalWorktime':'120:00',
                        'totalBreaktime':'10:00',
                        'totalOvertime':'00:00',
                        'totalLate':'0',
                        'totalLeaveEarly':'0'};
        //console.log(objRuikei);
        
        
        //勤務時間を分割
        var totalworkH = objRuikei.totalWorktime;
        time = totalworkH.split(":");

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