function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive(url, index) {
  var ss = SpreadsheetApp.openByUrl(url).getSheets()[index];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  Logger.log(data);
  return data;
}

function getSheetNames(url) {
//  Logger.log(SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1cZ1w8UhgEZ36iztyYdYEU6c6VVQJHMi9cnIb7Uq3eoU/edit#gid=0").getSheets().map(function(x) {return x.getName();})[1]);
  return SpreadsheetApp.openByUrl(url).getSheets().map(function(x) {return x.getName();});
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function is_folder_exist(first_name, last_name){
  var folders = DriveApp.getFolderById("1dyXUX5S09iN60V_qt-l8iFVcsTmFlXtU").getFolders();

  var assumed_folder_name = first_name + '_' + last_name;
 
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {    
      return true;
    }
  }
  return false;
}

function create_folder(first_name, last_name){
//  var first_name = "jerry";
//  var last_name = "chu";
  var folders = DriveApp.getFolderById("1dyXUX5S09iN60V_qt-l8iFVcsTmFlXtU");
  var assumed_folder_name = first_name + '_' + last_name;
  var newFolder = folders.createFolder(assumed_folder_name);
}
