var myapp = ons.bootstrap(['onsen','googleApi']);

// myapp.config(function(googleLoginProvider) {
//         googleLoginProvider.configure({
//             clientId: '25604735847-3hrfjp74pv66pqhvc7u6nho2iok2hts7.apps.googleusercontent.com',
//             scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login"]
//         });
//     });

ons.enableAutoStatusBarFill();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCJYLqPoA6Irb_FIg5Bh28QAM58G_Qlrk",
    authDomain: "kintaiapp-2006e.firebaseapp.com",
    databaseURL: "https://kintaiapp-2006e.firebaseio.com",
    projectId: "kintaiapp-2006e",
    storageBucket: "kintaiapp-2006e.appspot.com",
    messagingSenderId: "656106544976"
  };

console.log(config);

firebase.initializeApp(config);

console.log("app.js loaded!");