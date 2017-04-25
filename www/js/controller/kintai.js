'use strict'
myapp.service('ShareService',function(){
    return {
        start:'zz:zz',
        break:'zz:zz',
        end:'zz:zz'
    };
});
myapp.controller('KintaiController', function($scope, $http,ShareService) {

    /* 初期化 */
    // バーを止めるのに使うflag
    let stop_flag = {'work':[true],'break':[true]}; 

    // ボタンの状態を管理するflag
    let isTouch = {'syusya':false,'kyukei':false,'taisya':false,'teisyutu':false }; 
    let bar_data = {'value':[],'all':60*60*24,'time':1,'color':[]};

    //現在の時間をゼロ補完して返す
    //例)"2017-04-25"
    const hiduke = new Date();
    const datatime = hiduke.getFullYear() +'-'+("0"+(hiduke.getMonth() + 1)).slice(-2)+'-'+("0"+hiduke.getDate()).slice(-2);

    /*
      bar_dataはバーを描くためのデータ
      bar_data.valuleに勤怠状態が変更される度に追加されていく。

      例)
      value[i]=奇数:休憩
      value[i]=偶数:勤務時間

      [10000,100,10,1......]    : [10000スタート、100働く、10休む,1働く.....]

      単位は秒数
    */
    this.load = function(page) {
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
        $scope.splitter.left.toggle();
    };

    this.buttonManager = function(e) {
        const date_obj = new Date();
        const sec = date_obj.getHours()*60*60+date_obj.getMinutes()*60+date_obj.getSeconds();

        //出社時間(緑のバー開始位置)
        let start_time = sec; 

        // '出社'ボタンが初めて押されたとき
        if(!isTouch.syusya && e == 1){ 

            /* 現在時刻分バーを進める */
            bar_data.value.push(sec);
            bar_data.color.push("White");
            bar_data.all -= sec;

            // 出社ボタンのテキストを変更
            this.setText("syusya","出社時間を変更");　
            isTouch.syusya = true;
            bar_data.value.push(0);
            bar_data.color.push("Yellow");
            stop_flag.work[0] = false;
            this.updateBar(stop_flag.work);
            let hms =this.toHms(start_time);

            //「KINTAI_ARR」のAPI殴る
            $http({
                method: 'POST',
                url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/arrival/",
                data:{
                    "Employee_ID":$scope.user_uid,
                    "Arrival_Time":datatime + ","+hms
                }
            }
            ).
                success(function(data) {
                    console.log(data);
                    console.log("ajax successed");
                }).
                error(function(data, status, headers, config) {
                    console.log(status);
                    console.log(data);
                    console.log(headers);
                    console.log("ajax failed");
                });

        // 休憩ボタンが押された時
        }else if(isTouch.syusya && !isTouch.kyukei && !isTouch.taisya && e == 2){ 
            this.setText("kyukei","休憩をやめる");
            isTouch.kyukei = true;
            bar_data.value.push(0);
            bar_data.color.push("Green");
            stop_flag.work[0] = true;
            stop_flag.break[0] = false;
            this.updateBar(stop_flag.break);

        // 休憩をやめるボタンが押された時
        }else if(isTouch.syusya && isTouch.kyukei && !isTouch.taisya && e == 2){ 
            this.setText("kyukei","休憩");
            isTouch.kyukei = false;
            bar_data.value.push(0);
            bar_data.color.push("Yellow");
            stop_flag.work[0] = false;
            stop_flag.break[0] = true;
            this.updateBar(stop_flag.work);

        // 退社ボタンが押された時
        }else if(isTouch.syusya && !isTouch.taisya && e == 3){ 
            this.setText("taisya","退社時間を変更");
            this.setText("kyukei","休憩時間を変更");
            isTouch.taisya = true;
            stop_flag.work[0] =  stop_flag.break[0] = true;

        // '出社時間を変更'ボタンが押されたときの処理
        }else if(isTouch.syusya && e == 1){
            isTouch.syusya = true;
            this.showP("syusya","pop_temp1");

        // '休憩時間を変更'ボタンが押された時の処理
        }else if(isTouch.kyukei && e == 2){
            this.showP("kyukei","pop_temp2");

        // '退社時間を変更'ボタンが押された時の処理
        }else if(isTouch.taisya && e == 3){
            this.showP("taisya","pop_temp3");
        }else if(!isTouch.teisyutu && isTouch.taisya &&e == 4 ){

            //b:休憩合計
            //c:退社時間
            let b = 0; 
            let c = 0; 

            //勤怠状態を保持した配列の中身を以下で分ける
            //・休憩時間合計
            //・退社時間
            for(let i = 0;i < bar_data.value.length;i++){
                if(i != 0 && i%2 == 0){b += bar_data.value[i];}
                if(i != bar_data.value[0]){c += bar_data.value[i];}
            }

            let startTime = this.toHms(bar_data.value[0]);
            let breakTime = this.toHms(b);
            let endTime = this.toHms(c);

            //勤怠時間が変更されているか確認
            //変更されている場合は上書き
            if(ShareService.start != 'zz:zz'){
                startTime = ShareService.start;
            }else if(ShareService.break !='zz:zz'){
                breakTime = ShareService.break;
            }else if(ShareService.end != 'zz:zz'){
                endTime = ShareService.end;
            }

            //「KINTAI_SUB」のAPIを殴る
            $http({
                method: 'POST',
                url:"https://labo.ef-4.co.jp/deepblue/kintaiApp/kintai_sub/",
                data:{
                    "Employee_ID":$scope.user_uid,
                    "Arrival_Time":datatime+ ","+startTime,
                    "Break_Time":breakTime,
                    "Clock_out_Time":endTime
                }
            }
            ).
                success(function(data) {
                    console.log(data);
                    console.log("ajax successed");
                }).
                error(function(data, status, headers, config) {
                    console.log(status);
                    console.log(data);
                    console.log(headers);
                    console.log("ajax failed");
                });
        }else{

        }
    };

    //引数に入る秒数を"00:00"で返す
    this.toHms = function(start_time) {
        var hms = "";
        var h = start_time / 3600 | 0;
        var m = start_time % 3600 / 60 | 0;

        if (h != 0) {
            hms = h + ":" + padZero(m);
        } else if (m != 0) {
            hms = "00:"+m;
        }

        return hms;

        function padZero(v) {
            if (v < 10) {
                return "0" + v;
            } else {
                return v;
            }
        }
    };


    // バーの更新
    this.updateBar = function(stop_flag){ 
        this.loopSleep(stop_flag,bar_data.all,bar_data.time,function(i){
            bar_data.value[bar_data.value.length-1] = i;
            bar_data.all--;
            let data = [];

            for(let i = 0; i < bar_data.value.length; i++) data.push({value:bar_data.value[i]});
            data.push({value:bar_data.all});

            //グラフの色を入力
            let colors = [];
            for (let i = 0; i < bar_data.color.length; i++) colors.push(bar_data.color[i]);
            colors.push("White");

            const CANVAS_WIDTH =300;
            const CANVAS_HEIGHT =100;
            // barの横幅
            const _X = 0;
            // barの上下幅
            const _HEIGHT = 30;

            let context;
            init();

            
            //init - Main処理
            function init(){
                const canvas = document.getElementById('bar-chart-area');
                if(canvas.getContext){
                    context = canvas.getContext('2d');
                    prepareData();
                    drawGraph();
                }
            }

            function prepareData(){

                // total, color - 色,位置,合計値をセット
                let total = 0;
                for(let i = 0; i < data.length; i++){
                    data[i].color = colors[i];
                    data[i].startValue = total;
                    total += data[i].value;
                }

                // width, start_X - 横幅とxの値をセット
                data.forEach(function(obj){
                    obj.width = obj.value / total * (CANVAS_WIDTH-_X);
                    obj.start_X = obj.startValue / total * (CANVAS_WIDTH -_X);
                });
            }

            function drawGraph(){
                data.forEach(function(obj){
                    context.fillStyle = obj.color;
                    context.fillRect(obj.start_X,0,obj.width ,_HEIGHT);
                });
            }
        });
    }


    // 指定した回数と遅延時間で関数を回す
    this.loopSleep = function(break_flag,_loopLimit,_interval, _mainFunc){
        const loopLimit = _loopLimit;
        const interval = _interval;
        const mainFunc = _mainFunc;
        let i = 0;
        const loopFunc = function () {
            if(break_flag[0]) return;
            const result = mainFunc(i);
            if (result === false) {
                // break機能
                return;
            }
            if (++i < loopLimit) {
                setTimeout(loopFunc, interval);
            }
        }
        loopFunc();
    }

    //ボタンのテキストを変更
    this.setText = function(id,text){
        const area = document.getElementById(id);
        area.textContent = text;
    }

    //各ポップアップを表示
    //tmpl_id:ポップアップが入っているons-tmplateのid
    this.showP = function(button,tmpl_id) {
        ons.createPopover(tmpl_id).then(function(popover) {
            popover.show("#"+ button);
        });
    };

    ons.ready(function() {
        console.log("Onsen UI is ready!");
    });
});

myapp.controller('PopCloseController', function($scope,ShareService) {
    //プルダウンの中身を生成
    //model:時間
    //model1:分(15分刻み)
    $scope.data = {
        model:null,
            hourOptions: [],
        model1:null,
            minOptions: []
    };
    for(let i=0;i<=24;i++){
        $scope.data.hourOptions.push({id:i, name:i});
    }
    for(let i=0;i<=60;i++){
        if(i%15 == 0){
            $scope.data.minOptions.push({id:i,name:i});
        }
    }


    /*
     * 各変更ボタンから呼び出される
      表示されたポップアップを閉じる
      serviceに変更した時間を上書きする
      str
      1:出社時間変更
      2:休憩時間変更
      3:退社時間変更
    */
    this.addTimes = function(e,str){
        switch (str){
            case 1:
                ShareService.start = $scope.data.model +":"+ $scope.data.model1;
                break;
            case 2:
                ShareService.break = $scope.data.model +":"+ $scope.data.model1;
                break;
            case 3:
                ShareService.end = $scope.data.model +":"+ $scope.data.model1;
                break;
        }
        e.hide();
    }
});