function onOpen(e) {
    var ui = SpreadsheetApp.getUi();
       ui.createMenu('Generate HTML Files')
      .addItem('Run', 'main')
      .addToUi();
}
