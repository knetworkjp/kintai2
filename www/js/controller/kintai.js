'use strict'
myapp.controller('KintaiController', function($scope) {

    /* 初期化 */
    let stop_flag = {'work':[true],'break':[true]}; // バーを止めるのに使うflag
    let isTouch = {'syusya':false,'kyukei':false,'taisya':false,'teisyutu':false }; // ボタンの状態を管理するflag
    let bar_data = {'value':[],'all':60*60*24,'time':1,'color':[]};
    //    const db = window.openDatabase("kintai_db", "1.0","kintai" , 1000000);
    /*
        bar_dataはバーを描くためのデータ

        valueは勤務時間や休憩時間の値がそれぞれ秒単位で保存される。
        bar_data.value[i]でi=0とiが最後のインデックスの場合はバーを描くため(白く塗る)の値が
        入っている。それ以外のiにおいては、iが奇数のときにbar_data.value[i]は勤務時間のデータ、
        iが偶数のときにbar_data.value[i]は休憩時間のデータが入っている。

        allはバーの総合の値(バーを描くループ回数とかにも使用)

        timeはバーを増やしていく間隔の時間で単位はミリ秒。1秒にするときは1000とする。

        colorはvalueに対応した描くときの色
        */

    // let start_time; // 出社時間(秒)
    this.load = function(page) {
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
        $scope.splitter.left.toggle();
    };

    this.buttonManager = function(e) { // ボタンによる動きを管理する
        if(!isTouch.syusya && e == 1){ // '出社'ボタンが初めて押されたとき

            /* 現在時刻分バーを進める */
            const date_obj = new Date(); // 現在の時間を取得して、その分バーを白で塗りつぶす
            const sec = date_obj.getHours()*60*60+date_obj.getMinutes()*60+date_obj.getSeconds();
            let start_time = sec; //出社時間
            bar_data.value.push(sec);
            bar_data.color.push("White");
            bar_data.all -= sec;

            this.setText("syusya","出社時間を変更");　// 出社ボタンのテキストを変更
            this.updateBreakdown();
            isTouch.syusya = true;
            bar_data.value.push(0);
            bar_data.color.push("Yellow");
            stop_flag.work[0] = false;
            this.updateBar(stop_flag.work);
            //        }else if(isTouch.syusya && e == 1) { // '出社'ボタン二回目押下
            //            this.showP("syusya");
        }else if(isTouch.syusya && !isTouch.kyukei && !isTouch.taisya && e == 2){ // 休憩ボタンが押された時
            this.setText("kyukei","休憩をやめる");
            isTouch.kyukei = true;
            bar_data.value.push(0);
            bar_data.color.push("Green");
            stop_flag.work[0] = true;
            stop_flag.break[0] = false;
            this.updateBar(stop_flag.break);
        }else if(isTouch.syusya && isTouch.kyukei && !isTouch.taisya && e == 2){ // 休憩をやめるボタンが押された時
            this.setText("kyukei","休憩");
            isTouch.kyukei = false;
            bar_data.value.push(0);
            bar_data.color.push("Yellow");
            stop_flag.work[0] = false;
            stop_flag.break[0] = true;
            this.updateBar(stop_flag.work);
        }else if(isTouch.syusya && !isTouch.taisya && e == 3){ // 退社ボタンが押された時
            this.setText("taisya","退社時間を変更");
            this.setText("kyukei","休憩時間を変更");
            isTouch.taisya = true;
            stop_flag.work[0] =  stop_flag.break[0] = true;
        }else if(isTouch.syusya && e == 1){
            // '出社時間を変更'ボタンが押されたときの処理
            // ダイアログ出したい APIで取得した時間帯をプルダウンで選択
            isTouch.syusya = true;
            this.showP("syusya");

        }else if(isTouch.kyukei && e == 2){
            console.log('**************休憩****************');
            // '休憩時間を変更'ボタンが押された時の処理
            // ダイアログ出したい APIで取得した時間帯をプルダウンで選択
            this.showP("kyukei");

        }else if(isTouch.taisya && e == 3){
            // '退社時間を変更'ボタンが押された時の処理
            // ダイアログ出したい APIで取得した時間帯をプルダウンで選択
            this.showP("taisya");

        }else if(isTouch.teisyutu && e == 4){
            // '提出'ボタンが押された時の処理
            // ダイアログで注意文表示 APIでデータを登録
        }else{

        }
    };

    this.updateBreakdown = function(){ // 業務時間内訳の更新

        // var worktime_text = document.getElementById('worktime');
        // var breaktime_text = document.getElementById('breaktime');
        let dummy = [false];
        this.loopSleep(dummy,bar_data.all,bar_data.time,function(i){
            let worktime_data = {};
            let seconds = 0;
            for(let i = 1; i < bar_data.value.length; i+=2)
                seconds += bar_data.value[i];
            worktime_data['hours'] = Math.floor(seconds / 3600);
            worktime_data['minutes'] = Math.floor((seconds % 3600) / 60);
            // worktime_text.textContent = "勤務時間：" + worktime_data['hours'] + "時間" + worktime_data['minutes'] + "分";

            let breaktime_data = {};
            seconds = 0;
            for(let i = 2; i < bar_data.value.length; i+=2)
                seconds += bar_data.value[i];
            breaktime_data['hours'] = Math.floor(seconds / 3600);
            breaktime_data['minutes'] = Math.floor((seconds % 3600) / 60);
            // breaktime_text.textContent = "休憩時間：" + breaktime_data['hours'] + "時間" + breaktime_data['minutes'] + "分";
        });
    }

    this.updateBar = function(stop_flag){ // バーの更新
        this.loopSleep(stop_flag,bar_data.all,bar_data.time,function(i){
            bar_data.value[bar_data.value.length-1] = i;
            bar_data.all--;
            let data = [];
            for(let i = 0; i < bar_data.value.length; i++)
                data.push({value:bar_data.value[i]});
            data.push({value:bar_data.all});

            //グラフの色を入力
            let colors = [];
            for (let i = 0; i < bar_data.color.length; i++)
                colors.push(bar_data.color[i]);
            colors.push("White");
            const CANVAS_WIDTH =300;
            const CANVAS_HEIGHT =100;
            // barの横幅
            const _X = 0;
            // barの上下幅
            const _HEIGHT = 30;
            // var _X = 10;
            // var _Y = 100;
            // var _HEIGHT = 30;

            let context;
            init();

            /**
            init - Main処理
            */

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
                    context.fillStyle = obj.color; //内側の色
                    context.fillRect(obj.start_X,0,obj.width ,_HEIGHT);
                }); //指定の矩形を塗りつぶす
            }
        });
    }

    this.loopSleep = function(break_flag,_loopLimit,_interval, _mainFunc){ // 指定した回数と遅延時間で関数を回す
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
                setTimeout(loopFunc, interval); //angularJSのinterval??使う
            }
        }
        loopFunc();
    }

    this.setText = function(id,text){ // タグにつけたidに応じてtextをセット
        const area = document.getElementById(id);
        area.textContent = text;
    }

    this.showP = function($button) {
        ons.createPopover('view/kintai.html').then(function(popover) {
            popover.show("#"+ $button);
        });
    };
});
myapp.controller('PopCloseController', function($scope) {
    this.close = function(e){
        pop.hide();
    }

});
ons.ready(function() {
    console.log("Onsen UI is ready!");
});

