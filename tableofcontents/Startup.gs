function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Generate HTML Code')
      .addItem('Run', 'myFunction')
      .addToUi();
      
      
}