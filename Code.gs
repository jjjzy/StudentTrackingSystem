function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1IRmvCBdmLH6Y289tsk5StSEq4iGXgyznZtQ8u2IPssM/edit#gid=0").getSheetByName("current_student");

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