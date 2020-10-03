function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1IRmvCBdmLH6Y289tsk5StSEq4iGXgyznZtQ8u2IPssM/edit#gid=0").getSheetByName("sheet1");

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, ss.getLastRow(), 4).getValues();
  Logger.log(data);
  return data;
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}