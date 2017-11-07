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

        var btnMaker = $("<button>")
        btnMaker.text(person);
        btnMaker.addClass("btn");
        btnMaker.addClass("stock-button");
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


        //chart functions
        dailyPrice(time, close);
        JapaneseCandle(time, open, high, low, close, volume);
                   

      }).fail(function(error) {
        console.log(error);
      });
    });    
});
