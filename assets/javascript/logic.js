$(document).ready(function() {

	 var config = {
    apiKey: "AIzaSyAtIKkFHyiQ82mAH41vHZRdqVA_RNAPwWM",
    authDomain: "creepsearch.firebaseapp.com",
    databaseURL: "https://creepsearch.firebaseio.com",
    projectId: "creepsearch",
    storageBucket: "",
    messagingSenderId: "724675415469"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();
})