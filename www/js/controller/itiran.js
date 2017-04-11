myapp.controller('ItiranController', function($scope) {
    
    // APIで値を取得想定(とりあえずベタ書き)
    var objRuikei = {'totalWorkdays':'10',
                    'totalWorktime':'80:00',
                    'totalBreaktime':'10:00',
                    'totalOvertime':'00:00',
                    'totalLate':'0',
                    'totalLeaveEarly':'0'};
    console.log(objRuikei); // ログ確認用
    
    // 勤務時間を分割
    var totalworkH = objRuikei["totalWorktime"];
    time = totalworkH.split(":");
    console.log(time[0]);  // ログ確認用 
    // 勤務時間 > 出勤日数*12の場合は注意文表示
    var totaldays = objRuikei["totalWorkdays"]*12;    
    var coment = document.getElementById("overwork");
    if (totaldays <= time[0]) {
        coment.innerHTML = "働きすぎですよ!!(｀・д・)σﾒｯ!";
    } else {
        coment.innerHTML = "お疲れ様です!!";
    }
    
    // 勤務時間表示
    var totalwork = document.getElementById("totalwork");
    totalwork.innerHTML = objRuikei["totalWorktime"];
    
    // 休憩時間表示
    var totalbreak = document.getElementById("totalbreak");
    totalbreak.innerHTML = objRuikei["totalBreaktime"];
    
    // 残業時間表示
    var totalover = document.getElementById("totalover");
    totalover.innerHTML = objRuikei["totalOvertime"];
    
    // 遅刻回数表示
    var totallate = document.getElementById("totallate");
    totallate.innerHTML = objRuikei["totalLate"];
    
    // 早退回数表示
    var totalleaveearly = document.getElementById("totalleaveearly");
    totalleaveearly.innerHTML = objRuikei["totalLeaveEarly"];
    
  });


