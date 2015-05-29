

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

//Accordion list
var donShopDat = '<div id="accordion">';
for (var i = 0; i < donutShops.length; i++) {
  var donutShop = donutShops[i];
  var locId = donutShop.local;
      locId = locId.replace(/\s/g, "X");
  donShopDat += '<h2 class="heads">' + donutShop.local + '</h2>' +
                '<div>' + '<p class="hour">' + 'Donuts per hour: ' +
                donutShop.getDonutsPerHour() + '</p>' + '<p class="day" id="'+locId+
                '">' + 'Donuts per day: ' + donutShop.getDonutsPerDay() + '</p>' +
                '</div>';
}
donShopDat += '</div>';
$('content').append(donShopDat);

$(function() {
  $( "#accordion" ).accordion();
});

//A dragable kenneth
$("#kenneth").draggable();

//Timepicker function
$(function(){
  var open = $("#open"),
      close = $("#close"),
      addHour = 1;

  //Timepicker for open
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

  //Timepicker for close
  close.timepicker({
    onClose: function(dateText, inst) {
      var closeMrkr = close.datetimepicker("getDate"),
        timeMrkr = new Date(closeMrkr.getTime());
      timeMrkr.setHours(timeMrkr.getHours() - addHour);

      if (open.val() != "") {
        var openMrkr = open.datetimepicker("getDate");
        openMrkr.setHours(openMrkr.getHours() + addHour);

        if (openMrkr > closeMrkr)
          open.datetimepicker("setDate", timeMrkr);
      }
      else {
        open.datetimepicker("setDate", timeMrkr);
      }
    },
    onSelect: function (selectedDateTime){
      var timeMrkr = close.datetimepicker("getDate");
      timeMrkr.setHours(timeMrkr.getHours() - addHour);

      open.datetimepicker("option", "timeMrkr", timeMrkr);
    }
  });
});

//Dropdown list of locations
var shopLocal = '<select id="local" name="Location">';
for (var i = 0; i < donutShops.length; i++) {
  var donutShop = donutShops[i];
  shopLocal += '<option value='+'"'+donutShop.local+'"' + 'id='+i+'>' + donutShop.local +
                '</option>';
}
donShopDat += '</select>';

//Changes donut shop object operation hours to time duration from timepickers
//then updates donuts per day data from that on the location selected in the form
$('form').append(shopLocal);

$("#sbmtBtn").click(function(e) {
  e.preventDefault();
  var open, close, hoursOpp, local, localId
    open = $('#open');
    open = open.val();
    close = $('#close');
    close = close.val();
    local = $('#local');
    local = local.val();
    localId = $('option:selected').attr('id');
    localTxt = $('option:selected').text();
    localTxt = localTxt.slice(0, -5).replace(/\s/g, "X");


    console.log(localTxt);

    var oc = [open, close];
    var hld = [];
    for (var i = 0; i < oc.length; i++) {
    var tyme, mins, secs, dif
        tyme = oc[i].split(":");
        mins = tyme[0];
        scnds = tyme[1];
      scnds = parseInt(scnds, 10) + (parseInt(mins, 10) * 60);
      hld.push(scnds);
    }

    var dif = ((hld[1] * 60) - (hld[0] * 60)) / 3600;

    var donutShop = donutShops[localId];
        donutShop.hoursOp = dif;

    var nwDonsHr = donutShop.getDonutsPerDay();

    $('.day'+'#'+localTxt).text('Donuts per day: '+nwDonsHr);

});
