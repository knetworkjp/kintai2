myapp.controller('AppController', function($scope) {
    
    this.load = function(page) {
        console.log("AppController loading " + page);
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
      $scope.splitter.left.toggle();
    };
    
    this.changetab = function(tabId) {
      $scope.tabbar.setActiveTab(tabId);
      $scope.splitter.left.toggle();
    };
    
    this.navi = function(page) {
      $scope.tabNavigator.pushPage(page);
      $scope.splitter.left.toggle();
    };
    
    ons.ready(function() {
        // $scope.splitter.left.toggle();
        console.log("AppController is ready!");
    });
    
    $scope.showLogin=false;
    $scope.isConnect=true;
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDCJYLqPoA6Irb_FIg5Bh28QAM58G_Qlrk",
      authDomain: "kintaiapp-2006e.firebaseapp.com",
      databaseURL: "https://kintaiapp-2006e.firebaseio.com",
      projectId: "kintaiapp-2006e",
      storageBucket: "kintaiapp-2006e.appspot.com",
      messagingSenderId: "656106544976"
    };
    firebase.initializeApp(config);
    
    var _this;
    
myapp.controller('HelloController', function($timeout) {
          
        _this = this;
        this.newMail;
        this.newPassword;
        this.mail;
        this.password;
        this.isLoggedIn;
        this.$timeout = $timeout;
     
        // 新規ユーザ登録
        this.regi = function() {
          // 新規ユーザーの登録機能
          firebase.auth().createUserWithEmailAndPassword(this.newMail, this.newPassword).catch(function(error) {
            alert(error.message);
          });
        }
     
        // ログイン
        this.login = function() {
          // 新規ユーザーの登録機能
          firebase.auth().signInWithEmailAndPassword(this.mail, this.password).catch(function(error) {
            alert(error.message);
          });
        }
     
        // ログイン
        this.google = function() {
            
          // 標準ブラウザを開く
          // var ref = cordova.InAppBrowser.open('http://apache.org', '_system', 'location=no');
          
            // Using a redirect.
            firebase.auth().getRedirectResult().then(function(result) {
              if (result.credential) {
                // This gives you a Google Access Token.
                var accessToken = result.credential.accessToken;
                var refreshToken = result.credential.refreshToken;
                console.log('Google refreshToken = ' + refreshToken);
                console.log('Google accessToken = ' + accessToken);
              }
              var user = result.user;
            });
    
            // Start a sign in process for an unauthenticated user.
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithRedirect(provider);
    
                // var user = firebase.auth().currentUser;
                // var providerData = user.providerData;
                //   
                // for (var i = 0; i < providerData.length; i++) {
                //     if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                //         console.log('Google UID = ' + providerData[i].uid);
                //         console.log('Google displayName = ' + providerData[i].displayName);
                //         console.log(providerData[i]);
                //         // We don't need to reauth the Firebase connection.
                //             // return true;
                //     }
                // }
          
        }
     
        // ログアウト
        this.logout = function() {
          firebase.auth().signOut();
        }
      });
      
    ons.ready(function() {
        
      // 認証状態変更検知
      firebase.auth().onAuthStateChanged(function(user) {
        _this.$timeout(function() {
            
          if (user) {
            console.log("USERID = " + user.uid);
            user.getToken(true).then(function(token) {
             // Send 'token' (string) to backend directly
               console.log(token);
            }).catch(function(error) {
                // console.log(error)
            });;
              
            //ログイン中のユーザー情報
            var providerData = user.providerData;
            
            //   
            // for (var i = 0; i < providerData.length; i++) {
            // if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
            //     console.log('Google UID = ' + providerData[i].uid);
            //     console.log(providerData[i].credential);
            //     // We don't need to reauth the Firebase connection.
            //         // return true;
            //       }
            // 
            
              
            // ログイン状態
            _this.isLoggedIn = true;  //ここに画面遷移を描いてもいい
          } else {
            // ログアウト状態
            _this.isLoggedIn = false;
          }
        })
      });
    });


});

