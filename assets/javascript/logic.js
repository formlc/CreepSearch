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
    var alphaVanAPIkey = "FJH3LVLVBBGH5FWT";


    $("#add-stock").on("click", function() {

      person = $("#stock-input").val();

      $.ajax({        
        url:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + person + "&apikey=" + alphaVanAPIkey,
        method: "GET"       
      }).done(function(response) {  

        var btnMaker = $("<button>")

        btnMaker.addClass("btn")
        btnMaker.addClass("stock-button")
        btnMaker.html("<button>").text(person);

        $("button-area").append(btnMaker);

        TESTER = document.getElementById('result-panel-left');
        Plotly.plot( TESTER, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );

        console.log(response); 

      }).fail(function(error) {
        console.log(error);
      });
    });    
});
