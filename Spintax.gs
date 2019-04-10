function spintax(){

    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("main");

    var numP1 = ss.getRange("D4:D").getValues().filter(String);
    var text  = [];
    var matches, options, random;
    var regEx = new RegExp(/{([^{}]+?)}/);
    
      for(var i=0;i<(numP1.length);i++){

        text[i] = String(numP1[i]);
        
        while((matches = regEx.exec(text[i])) !== null) {
          options = matches[1].split("|");
          random = Math.floor(Math.random() * options.length);
          text[i] = text[i].replace(matches[0], options[random]); 
        }
    }
     
     //return text array
     return(text);
}