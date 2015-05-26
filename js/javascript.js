

//Donut shop constructor function and three methods
function DonutShop(local, minCustomers, maxCustomers,
  avgDonutsCstmr, hoursOp) {
  this.local = local;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonutsCstmr = avgDonutsCstmr;
  this.hoursOp = hoursOp;


  //Method that returns a random estimate of customers per hour within a range
  this.customerPerHour = function () {
    var range = this.maxCustomers - this.minCustomers + 1;
    var cstRange = Math.floor(Math.random() * range) + this.minCustomers;
    return cstRange;
  };
  //Method that returns required number of donuts an hour
  this.getDonutsPerHour = function() {
     donutsPerhour = Math.floor(this.customerPerHour() * this.avgDonutsCstmr);
    return donutsPerhour;
  };

  //Method that returns required number of donuts a day
  this.getDonutsPerDay = function() {
    var donsDay = Math.floor(donutsPerhour * this.hoursOp);
    return donsDay;
  };

}

var donutShops = [];

var downtown = new DonutShop('Downtown',8, 43, 4.5, 8);
var capitolHill = new DonutShop('Captiol Hill', 4, 37, 2.00, 8);
var slu = new DonutShop('South Lake Union', 9, 23, 6.33, 8);
var wedgewood = new DonutShop('Wedgewood', 2, 28, 1.25, 8);
var ballard = new DonutShop('Ballard', 8, 58, 3.75, 8);

donutShops.push(downtown);
donutShops.push(capitolHill);
donutShops.push(slu);
donutShops.push(wedgewood);
donutShops.push(ballard);

//----Old!!!! Iterates through array, constructs objects with donutShop
//constructor, pushes objects to array
/*Supplied shop data
var donutShopData = [['Downtown', 8, 43, 4.50, 8],
  ['Capitol Hill', 4, 37, 2.00, 8], ['South Lake Union', 9, 23, 6.33, 8],
  ['Wedgewood', 2, 28, 1.25, 8], ['Ballard', 8, 58, 3.75, 8]];

  Test for terminal

Array of all donut shops


IIFE that uses DonutShop constructor to create new DonutShop class objects
from data in donutShopData array and pushes those objects into donutShops array
var assembleDonutShops = (function() {
  for (var i = 0; i < donutShopData.length; i++) {
    var singleShop = donutShopData[i];
    var donutShop = new DonutShop(singleShop[0], singleShop[1],
                                  singleShop[2], singleShop[3],
                                  singleShop[4]);
    donutShops.push(donutShop);
  }
   }()); */

//Empty DonutMaster constructor with two methods
var DonutMaster = function() {
  //Method to add a new DonutShop object using DonutShop constructor
  this.addShop = function(local, minCustomers, maxCustomers,
    avgDonutsCstmr, hoursOp) {
    var shop = new DonutShop(local, minCustomers, maxCustomers,
                              avgDonutsCstmr, hoursOp);
    donutShops.push(shop);
  };

  //Array that stores data from generateReport
  var report = [];

  //Method that iterates through donutShops array and pushes to report array
  this.generateReport = function() {
    for (var i = 0; i < donutShops.length; i++) {
      var data = [donutShops[i].local, donutShops[i].donsHr,
                  donutShops[i].getDonutsPerDay()];
      report.push(data);
    }
  };
};

//Creates an object of DonutMaster named dunkeldon
var dunkeldon = new DonutMaster();

//--------OLD!!! javascript to iterate through donutShops array, pulls values,
//runs two methods, appends this to tBody
/* On window load, locates tbody in DOM, creates new elements and appends
them to the tbody
window.onload = function() {
  var tBody = document.getElementsByTagName('tbody')[0];

  for (var i = 0; i < donutShops.length; i++) {
    var row = document.createElement("tr");
    var donutShop = donutShops[i];
    var datum = [donutShop.local, donutShop.getDonutsPerHour(),
                donutShop.getDonutsPerDay()];

    for (var j = 0; j < datum.length; j++) {
      var cell = document.createElement("td");
      var cellData = document.createTextNode(datum[j]);
      cell.appendChild(cellData);
      row.appendChild(cell);
      tBody.appendChild(row);
    }
  }
}; */





  var donShopDat = '<div id="accordion">';

  for (var i = 0; i < donutShops.length; i++) {
    var donutShop = donutShops[i];
    donShopDat += '<h2 class="heads">' + donutShop.local + '</h2>' + '<div>' +
                 '<p>' + 'Donuts per hour: ' + donutShop.getDonutsPerHour() + '</p>' +
                 '<p>' + 'Donuts per day: ' + donutShop.getDonutsPerDay() + '</p>' + '</div>';
  }

  donShopDat += '</div>';

  $('content').append(donShopDat);

  $(function() {
    $( "#accordion" ).accordion();
  });

  $("#kenneth").draggable();



  $(function(){
    var open = $("#open"),
        close = $("#close"),
        addHour = 1;

    open.timepicker({
      onClose: function(dateText, inst) {
        var openMrkr = open.datetimepicker("getDate"),
          timeMrkr = new Date(openMrkr.getTime());

        timeMrkr.setHours(timeMrkr.getHours() + addHour);

        if (close.val() != "") {
          var closeMrkr = close.datetimepicker("getDate");
          closeMrkr.setHours(closeMrkr.getHours() - addHour);

          if (openMrkr > closeMrkr)
            close.datetimepicker("setDate", timeMrkr);
        }
        else {
          close.datetimepicker("setDate", timeMrkr);
        }
      },
      onSelect: function (selectedDateTime){
        var timeMrkr = open.datetimepicker("getDate");
        timeMrkr.setHours(timeMrkr.getHours() + addHour);

        close.datetimepicker("option", "timeMrkr", timeMrkr );
      }
    });
          close.timepicker({
            onClose: function(dateText, inst) {
              var closeMrkr = close.datetimepicker("getDate"),
                maxDate = new Date(closeMrkr.getTime());
              maxDate.setHours(maxDate.getHours() - addHour);

              if (open.val() != "") {
                var openMrkr = open.datetimepicker("getDate");
                openMrkr.setHours(openMrkr.getHours() + addHour);

                if (openMrkr > closeMrkr)
                  open.datetimepicker("setDate", maxDate);
              }
              else {
                open.datetimepicker("setDate", maxDate);
              }
            },
            onSelect: function (selectedDateTime){
              var maxDate = close.datetimepicker("getDate");
              maxDate.setHours(maxDate.getHours() - addHour);

              open.datetimepicker("option", "maxDate", maxDate);
            }
          });
        });