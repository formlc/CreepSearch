var o;
var person;

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


<<<<<<< HEAD
    $("#add-stock").on("click", function(event) {
      event.preventDefault();

      person = $("#stock-input").val();

      $.ajax({        
        url:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + 
        person + "&apikey=" + alphaVanAPIkey,
        method: "GET"       
      }).done(function(response) { 
        console.log(response); 
=======
    function volumeHist(time, volume) {
      var trace = {
        x: time,
        y: volume,
        type: 'histogram',
      };
      var data = [trace];
      Plotly.newPlot('result-panel-left', data);
    }

    function dailyPrice(time, close) {
        Plotly.plot( 'result-panel-left', [{
        x: time,
        y: close }], {
        margin: { t: 0 } } );
    }

    function JapaneseCandle(time, open, high, low, close, volume) {
      var trace1 = {
  
          x: time, 
          close: close,
          decreasing: {line: {color: '#ce0609'}}, 
          high: high,
          increasing: {line: {color: '#10f249'}}, 
          line: {color: 'rgba(31,119,180,1)'},  
          low: low,
          open: open,
          type: 'candlestick', 
          xaxis: 'x', 
          yaxis: 'y'
        };
        
        var data = [trace1];

        var layout = {
          dragmode: 'zoom', 
          margin: {
            r: 10, 
            t: 25, 
            b: 40, 
            l: 60
          }, 
          showlegend: true, 
          xaxis: {
            autorange: true, 
            rangeslider: {range: [time[0], time.slice(-1)[0]]}, 
            title: 'Date', 
            type: 'date'
          }, 
          yaxis: {
            autorange: true, 
            type: 'linear'
          },
          
          // annotations: [
          //   {
          //     x: time[0],
          //     y: 0.9,
          //     xref: 'x',
          //     yref: 'paper',
          //     text: 'largest movement',
          //     font: {color: 'magenta'},
          //     showarrow: true,
          //     xanchor: 'right',
          //     ax: -20,
          //     ay: 0
          //   }
          // ],
          
          shapes: [
              {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: time[0],
                  y0: 0,
                  x1: time[1],
                  y1: 1,
                  fillcolor: '#d3d3d3',
                  opacity: 0.2,
                  line: {
                      width: 0
                  }
              }
            ]
        };

        Plotly.plot('result-panel-right', data, layout);
    }

    $("#add-stock").on("click", function() {

        var person = $("#stock-input").val();
        console.log(person);
>>>>>>> dcb101c13882ca1d714f2878e469b0cd3d8f4b2a

        var btnMaker = $("<button>")
        btnMaker.text(person);
        btnMaker.addClass("btn");
        btnMaker.addClass("stock-button");
<<<<<<< HEAD
        $(".button-area").prepend(btnMaker);
=======
        btnMaker.attr("id", person)
        $(".button-area").append(btnMaker);
    })

//ask chris about this shit something to do with dynamically created buttons
    $(".button-area").on("click", '.stock-button', function() {
      var person = $(this).attr("id");
      console.log(person) ;
      $.ajax({        
        url:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + person + "&apikey=" + alphaVanAPIkey,
        method: "GET"       
      }).done(function(response) { 
        console.log(response); 
>>>>>>> dcb101c13882ca1d714f2878e469b0cd3d8f4b2a

        var seriesData = response["Time Series (Daily)"];
        var time = [];
        var open = [];
        var high = [];
        var low = [];
        var close = [];
        var volume = [];

        for (var index in seriesData) {

          var object = seriesData[index];


          time.push(index);
          open.push(object["1. open"]);
          high.push(object["2. high"]);
          low.push(object["3. low"]);
          close.push(object["4. close"]);
          volume.push(object["5. volume"]);
        }

<<<<<<< HEAD
        TESTER = document.getElementById('result-panel-left');
        //TESTER = $("#result-panel-left");
        Plotly.plot( TESTER, [{
        x: numDays,
        y: closePrice }], {
        margin: { t: 0 } } );
 
=======

        //chart functions
        dailyPrice(time, close);
        JapaneseCandle(time, open, high, low, close, volume);
                   
>>>>>>> dcb101c13882ca1d714f2878e469b0cd3d8f4b2a

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
