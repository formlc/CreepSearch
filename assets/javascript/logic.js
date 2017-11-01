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
    var person = "";
    var fullcAPIkey = "fee7e92ad9005378"

    $("#submit").on("click", function() {

      person = $("#email-input").val();

      $.ajax({        
        url:"https://api.fullcontact.com/v2/person.json?email=" + person + "&APIKey=" + fullcAPIkey,
        method: "GET"       
      }).done(function(response) {
          console.log(response); 
      });    
    });


     
});
