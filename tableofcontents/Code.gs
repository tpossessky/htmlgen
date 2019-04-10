//TOC Builder Program

function myFunction() {
  
    var mainSheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
    var outsheet    = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Output");

    //clear column 'B' and h
    for(i = 2; i < 50; i++){
    
    outsheet.getRange(i,8).clear();

     
    }
    outsheet.getRange(5,7).clear();

    //reads all values in col A into array
    var Avals = mainSheet.getRange("A2:B").getValues();
    var Bvals = mainSheet.getRange("B2:B").getValues();
    var Cvals = mainSheet.getRange("C2:C").getValues();
    var divtag = mainSheet.getRange("D2").getValues();
    //gets length of non-null vals in col A
    var data = Bvals.filter(String).length;   
    var headLines = [];
    var idTag = [];
    var list = [];
    var hreftag = [];
    var elementid = [];
    var output= '';
    
    //read values into array
    for(var i=0;i<(data);i++){
    
      elementid[i] = Avals[i][0];
      headLines[i] = Bvals[i][0];
      hreftag[i] = Cvals[i]
      
    }
    Logger.log(headLines.length);
    
    //array 2 all lower case and no space
    for(i = 0; i <headLines.length; i++){
    
    idTag[i] = hreftag[i].toString().toLowerCase();
    idTag[i] = idTag[i].replace(/ /g,"_");
    
    }

  //format cell g5
    
    for(i = 0; i < headLines.length; i++){
    
        outsheet.getRange(i+5,8).setValue("<"+elementid[i]+ " id=\'"+idTag[i]+"\'>"+headLines[i]+"</"+elementid[i]+">"+"\nCONTENT GOES HERE\n\n")
    }
    

    

    //reads all values in col B into array
    var Hvals = outsheet.getRange("H2:H").getValues();
    //gets length of non-null vals in col A
    var contentData = Hvals.filter(String).length; 
    var subhead = [];
    for(var i =0; i < contentData;i++){
    
    subhead[i] = outsheet.getRange(i+5,8).getValues();
    
    }
    var currentVal;

    for(var i = 0; i <contentData;i++){
    
    var g5 = outsheet.getRange(5,7).getValues();
    outsheet.getRange(5,7).setValue(g5+subhead[i]);
    
    
    }
    
    //Table Output
    
    outsheet.getRange(2,7).setValue("<div class=\'"+divtag+"\'>\n<strong>Table of Contents</strong>\n<ul>")
    outsheet.getRange(4,7).setValue("</ul>\n</div>")
    
    
    for(i = 0; i<headLines.length;i++){
    
        list[i]="<li><a href=\'#" + idTag[i] + "\'>"+headLines[i]+"</a></li>\n";
        output = output + list[i]
    }
    
    outsheet.getRange(3,7).setValue(output);
    
    //concatenate variables
    var g2 = outsheet.getRange(2,7).getValues();
    var g3 = outsheet.getRange(3,7).getValues();
    var g4 = outsheet.getRange(4,7).getValues();  
    var g5 = outsheet.getRange(5,7).getValues();

    
    outsheet.getRange(2,1).setValue(g2+"\n"+g3+g4+"\n"+g5);
}