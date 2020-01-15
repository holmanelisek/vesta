  

import Quagga from 'quagga'; // ES6
const Quagga = require('quagga').default; // Common JS (important: default)

//create a space for the camera to initialize that will also start Quagga

var scanned = [];
//when camera is opened, initialize/start Quagga
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      //whenever a barcode is detected, push to scanned array
      Quagga.onDetected(function(){
        scanned.push(data.codeResult.code)
      });
  });
//when button is clicked
  //Quagga.stop();
  //


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