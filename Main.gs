function main() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("main");
  //Gets name of directory 
  var dirObj = ss.getRange("B1").getValues();
  var dir    = String(dirObj);
  
  /*Tests if folder with name dir exists
  If one doesn't exist, one will be created*/
  try{
    DriveApp.getFoldersByName(dir).next()
  }
  catch(err){
    DriveApp.createFolder(dir);
  }
  
  //Filters null data in cols 
  var numURL  = ss.getRange("A4:A").getValues().filter(String);
  var numTitles = ss.getRange("B4:B").getValues().filter(String);
  var robotNum     = ss.getRange("C4:C").getValues().filter(String);

  //empty arrays
  var URL = [];
  var titles = [];
  var robot  = [];

  //populates arrays
  for(var i=0;i<(numURL.length);i++){
        URL[i] = String(numURL[i]);
        titles[i] = String(numTitles[i]);
        robot[i] = String(robotNum[i]);
    }
    
   //sets values of robots
   var j = 0;
   while(j < robot.length){
   
       if(robot[j] == 'Yes'){
       robot[j] = "<META NAME=\"ROBOTS\" CONTENT=\"NOINDEX,FOLLOW\">\n"
       }
       else{
         robot[j] = "";
       }
       j++;
   }
    
      //Creating filename from URL
      
      var filename = []; 
      
      var regex = /http*.:\/\/www.pointbayfuel.com\//g;
      var regex2 = /\.html/
      
      for(i = 0; i < URL.length;i++){
      
      filename[i] = URL[i].replace(regex,"");
      filename[i] = filename[i].replace(regex2,"");
      
      }
      
      //finds home page and sets to index
      for(i = 0; i < filename.length;i++){
      
        if(filename[i] == ''){
        
        filename[i] = 'index';
        
        }
      }
 
  //Initilization of Object Array
  var htmlInfo = {};
  //create HTML files
  for (i = 0; i < numURL.length; i++) {
    //Object Array Properties Definition for 'i' number of files
    htmlInfo[i] = { name: filename[i],
                    URL: URL[i],
                    title: titles[i],
                    robot: robot[i],
                  };                
                  
     //file creation
     
     var doc  = DriveApp.createFile(htmlInfo[i].name, '<!DOCTYPE HTML>\n<html>\n<head>\n'+'<link rel= "canonical" href = \"'+URL[i]+'\"/>\n'+robot[i]+'<title>'+titles[i]+'</title>\n</head>'+'\n<body>\n</body>'+'\n</html>', MimeType.HTML);
     var docFile = DriveApp.getFileById(doc.getId());

     DriveApp.getFoldersByName(dir).next().addFile(docFile);
     DriveApp.getRootFolder().removeFile(docFile);     
    
  }     
  
  //sitemap creation
  
  var siteArray = [];
  
  for(i = 0; i < filename.length;i++){
  
     siteArray[i] = "<a href =\""+filename[i]+".html\">"+titles[i]+"</a><br>\n";
  
  }
  
     siteArray = siteArray.join('');
 
     var site = DriveApp.createFile('sitemap','<!DOCTYPE HTML>\n<html>\n<head>\n</head>\n<body>\n'+siteArray+'</body>\n</html>',MimeType.HTML);
     var docFile2 = DriveApp.getFileById(site.getId());
     DriveApp.getFoldersByName(dir).next().addFile(docFile2);
     DriveApp.getRootFolder().removeFile(docFile2);
     
}