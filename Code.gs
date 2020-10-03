function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function userClicked(){
  Logger.log("someone clicked the button");
}
//
function importCSVFromGoogleDrive() {
//  var file = DriveApp.getFilesByName("data.csv");
//  Logger.log(file.get);
//  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
//  var sheet = SpreadsheetApp.getActiveSheet();
//  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
//  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wwww');
  
//  Logger.log(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('wwww'));
//  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
//  if (sheet != null) {
//    Logger.log(sheet.getIndex());
//  }
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1IRmvCBdmLH6Y289tsk5StSEq4iGXgyznZtQ8u2IPssM/edit#gid=0").getSheetByName("sheet1");
//  Logger.log(ss);
//  ss.getRange("D2").setValue("123")
//  Logger.log(ss.getRange("A2").getValue());
  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
//  Logger.log(rows);
//  Logger.log(cols);
  
  var data = ss.getRange(1, 1, ss.getLastRow(), 4).getValues();
  Logger.log(data);
  return data;
  
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}