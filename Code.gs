function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1cZ1w8UhgEZ36iztyYdYEU6c6VVQJHMi9cnIb7Uq3eoU/edit#gid=0").getSheetByName("MCS_MENG");

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  Logger.log(data);
  return data;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

