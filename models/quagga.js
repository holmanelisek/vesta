
//import Quagga from 'quagga'; // ES6
//const Quagga = require('quagga').default; // Common JS (important: default)

//create a space for the camera to initialize that will also start Quagga

//var scanned = [];
//an array of strings/upcs scanned from barcodes


//when camera is opened, initialize/start Quagga
//Quagga.init({
//    inputStream : {
//      name : "Live",
//      type : "LiveStream",
//      target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
//    },
//    decoder : {
//      readers : ["upc_reader"]
//    }
//  }, function(err) {
//      if (err) {
//          console.log(err);
//          return
//      }
//      console.log("Initialization finished. Ready to start");
//      Quagga.start();
//      //whenever a barcode is detected, push to scanned array
//      Quagga.onDetected(function(){
//        scanned.push(data.codeResult.code)
//      });
//      onclick, Quagga.stop();
//      done=true
//  });

//when button is clicked
  //Quagga.stop();
  //"You scanned these items. Add to pantry?"
  //Display:
    //for(i=0,i++,i<scanned.length)
        //var inUPC = false;
        //checkItem(i);
        //if inUPC = false
            //api call for upc (update a API counter variable? 100 per day!)
            //update upcdata table
        //autofill/display brand, title, upc, date in
        //enter quantity, best by, date out
        //button to update pantry
    //scanned = [];

//checkItem(showing, result){
//  var item = scanned[showing];
//  check upcdata (select all where upc is item)
//  if item is in upcdata, return the result, inUPC =true
//}


//initialize camera
//scan each barcode
//save result to array
//close out, quagga.stop (no more processing, disconnects camera)
//"You scanned these items. Add to pantry?"
  //Run each UPC through personal API, display info if exists
  //select all where upc = 
  //Otherwise, run through external API, display info (add to personal API/database on confirmation)
  //buttons: add to pantry (add any additional information/update quantity check?) // this isn't my item (manual correction)

//API: https://api.upcitemdb.com/prod/trial/lookup?upc=885909950805
//lookup by upc (return items array, has: title, upc, brand)