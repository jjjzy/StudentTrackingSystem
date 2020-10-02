function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function userClicked(){
  Logger.log("someone clicked the button");
}

function importCSVFromGoogleDrive() {
  var file = DriveApp.getFilesByName("data.csv").next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}