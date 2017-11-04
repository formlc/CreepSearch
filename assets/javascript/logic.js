var o;

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
        console.log(response); 

        var btnMaker = $("<button>")
        btnMaker.text(person);
        btnMaker.addClass("btn");
        btnMaker.addClass("stock-button");
        $(".button-area").append(btnMaker);

        var seriesData = response["Time Series (Daily)"];
        var numDays = [];
        var numDaysCount = 0;
        var closePrice = [];

        for (var index in seriesData) {

          var object = seriesData[index];

          console.log(object);
          console.log(object["1. open"]);
          closePrice.push(object["4. close"]);
          console.log(object["5. volume"]);
          numDaysCount++;
          numDays.push(numDaysCount);
        }

        console.log(numDays);



        TESTER = document.getElementById('result-panel-left');
        Plotly.plot( TESTER, [{
        x: numDays,
        y: closePrice }], {
        margin: { t: 0 } } );
 

      }).fail(function(error) {
        console.log(error);
      });
    });    
});
