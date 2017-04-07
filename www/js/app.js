var myapp = ons.bootstrap("myapp", ['onsen','googleApi']);


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