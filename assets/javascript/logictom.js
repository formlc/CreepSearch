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
    var pixAPIkey = "6932043-19061e617df56f24c98781616";


    $("#add-stock").on("click", function(event) {
      event.preventDefault();

      person = $("#stock-input").val();

      $.ajax({        
        url:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + 
        person + "&apikey=" + alphaVanAPIkey,
        method: "GET"       
      }).done(function(response) { 
        console.log(response); 

        var btnMaker = $("<button>")
        btnMaker.text(person);
        btnMaker.addClass("btn");
        btnMaker.addClass("stock-button");
        $(".button-area").prepend(btnMaker);

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
        //TESTER = $("#result-panel-left");
        Plotly.plot( TESTER, [{
        x: numDays,
        y: closePrice }], {
        margin: { t: 0 } } );
 

      }).fail(function(error) {
        console.log(error);
      });

      displayPicturesinRow();

      function displayPicturesinRow() {

        $.ajax({        
          url:"https://pixabay.com/api/?key=" + 
          pixAPIkey + "&q=" + encodeURI(person) + "&image_type=photo&per_page=5",
            method: "GET"       
        }).done(function(pixresponse) {
          console.log(person);
          console.log(pixresponse); 
          results = pixresponse.hits;
          console.log(results);

            // make a new row for the products table

          var newRow = $("<tr>");

          for (var i = 0; i < results.length; i++) {

            var tdColumn = $("<td>");

            // make the image to be put into the new div
            var productImage = $("<img>");

            // the src attribute becomes a still image
            productImage.attr("src", results[i].previewURL);

            tdColumn.append(productImage);

            newRow.append(tdColumn);

          }

            // then, prepend to the table, so latest row of pics is at the top
          $("#tbody-new-row").prepend(newRow);
    
          });

     }

     $("#stock-input").val("");

    });

});
