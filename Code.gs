function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive(url, index) {
  var ss = SpreadsheetApp.openByUrl(url).getSheets()[index];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  return data;
}

function getTableHeader(url, index) {
  var ss = SpreadsheetApp.openByUrl(url).getSheets()[index];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  return data[0];
}

function getSheetNames(url) {
  return SpreadsheetApp.openByUrl(url).getSheets().map(function(x) {return x.getName();});
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function is_folder_exist(first_name, last_name, uin){
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;

  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      return true;
    }
  }
  return false;
}

function create_folder(first_name, last_name, uin){
//  first_name = "tom";
//  last_name = "tom";
//  uin = "tom";
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ");
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var newFolder = folders.createFolder(assumed_folder_name);
}

function get_folder_name(first_name, last_name, uin){
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;

  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      Logger.log(folder.getUrl());
      return folder.getUrl();
    }
  }
  return null;
}

function add_student(data, first_name, last_name, uin){
//  data = ["tom", "tom", "tom"];
//  first_name = "tom";
//  last_name = "tom";
//  uin = "tom";
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];
  
//  if(is_folder_exist(first_name, last_name, uin)){
//    var folder_link = get_folder_name(first_name, last_name, uin);
//    data.push(String(folder_link));
//  }
//  else{
//    data.push(String("doesn't exist"));
//  }
  
  while(!is_folder_exist(first_name, last_name, uin)){

  }
  
  var folder_link = get_folder_name(first_name, last_name, uin);
  data.push(String(folder_link));
  
  ss.appendRow(data);
}

function give_folder_and_link_to_a_student(first_name, last_name, uin){
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  
  var uin_index;
  var link_index = cols - 1;
  
  for(var i = 0; i < cols; i++){
    if(data[0][i].includes("UIN") || data[0][i].includes("uin") || data[0][i].includes("Uin")){
      uin_index = i;
    }
    
  }
  
  
  
  for(var i = 0; i < rows; i++){
    if(data[i][uin_index] == uin){
//      uin_index = i;
//      Logger.log(data[i][uin_index])
//      data[i][link_index]
      while(!is_folder_exist(first_name, last_name, uin)){}
  
      var folder_link = get_folder_name(first_name, last_name, uin);
      
      ss.getRange(i + 1, link_index + 1).setValue(folder_link);
    }
  }
//  return data[0];
  
//  for(var i = 1; i < rows; i++){
//    for (var j = 1; j < cols ; j++){
//      var cell = data.getCell(j,i).getValue();
//      if (cell === "-"){
//        sheet.getRange(j+1,i+1).setBackground("#cc4125");
//      }else if (cell === 0){
//        sheet.getRange(j+1,i+1).setBackground("#e69138");
//      };
//    };
//  };

}





function all(first_name, last_name, uin){
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ");
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var newFolder = folders.createFolder(assumed_folder_name);
  
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

  var url;
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      url = folder.getUrl();
    }
  }

  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  
  var uin_index;
  var link_index = cols - 1;
  
  for(var i = 0; i < cols; i++){
    if(data[0][i].includes("UIN") || data[0][i].includes("uin") || data[0][i].includes("Uin")){
      uin_index = i;
    }
  }
  
  for(var i = 0; i < rows; i++){
    if(data[i][uin_index] == uin){
      while(!is_folder_exist(first_name, last_name, uin)){}
      ss.getRange(i + 1, link_index + 1).setValue(url);
    }
  }
  
  
//  var folders = DriveApp.getFolderById("1dyXUX5S09iN60V_qt-l8iFVcsTmFlXtU").getFolders();

//  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
//
//  while (folders.hasNext()) {
//    var folder = folders.next();
//    if(assumed_folder_name == folder.getName()) {
//      return true;
//    }
//  }
//  return false;
  
  Utilities.sleep(1000);
}

function add_student_and_append_link(data, first_name, last_name, uin){
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ");
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var newFolder = folders.createFolder(assumed_folder_name);
  
  newFolder.createFolder("Advising Notes");
  newFolder.createFolder("Application");
  newFolder.createFolder("Degree Documents");
  newFolder.createFolder("ISS Documents");
  
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

  var url;
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      url = folder.getUrl();
    }
  }

  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];
  
  data.push(url);
  
  ss.appendRow(data);
}






function alll(first_name, last_name, uin){
//  Utilities.sleep(100000);
  var folder = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ");
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var newFolder = folder.createFolder(assumed_folder_name);
  
  newFolder.createFolder("Advising Notes");
  newFolder.createFolder("Application");
  newFolder.createFolder("Degree Documents");
  newFolder.createFolder("ISS Documents");
  
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

  var url;
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      url = folder.getUrl();
    }
  }

  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];

  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  var data = ss.getRange(1, 1, rows, cols).getValues();
  
  var uin_index;
  var link_index = cols - 1;
  
  for(var i = 0; i < cols; i++){
    if(data[0][i].includes("UIN") || data[0][i].includes("uin") || data[0][i].includes("Uin")){
      uin_index = i;
    }
  }
  
  var data_index;
  
  for(var i = 0; i < rows; i++){
    if(data[i][uin_index] == uin){
      data_index = i;
      ss.getRange(i + 1, link_index + 1).setValue(url);
    }
  }
  
  
//  var folders = DriveApp.getFolderById("1dyXUX5S09iN60V_qt-l8iFVcsTmFlXtU").getFolders();

//  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
//
//  while (folders.hasNext()) {
//    var folder = folders.next();
//    if(assumed_folder_name == folder.getName()) {
//      return true;
//    }
//    
//  }
//  return false;
  
//  while(is_folder_exist(first_name, last_name, uin) == false && (data[i][link_index] != " " || data[i][link_index] != "")){
//    
////    Utilities.sleep(1000000);
//  }
  
  
}

function test(){
  var data = importCSVFromGoogleDrive("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0", 0);
  var link_index = data[0].length - 1;
    var first_name_index, last_name_index, uin_index;
    
    for(var i = 0; i < data[0].length; i++){
      if(data[0][i].includes("First") || data[0][i].includes("first") || data[0][i].includes("FIRST")){
        first_name_index = i;
      }
      
      if(data[0][i].includes("Last") || data[0][i].includes("last") || data[0][i].includes("LAST")){
        last_name_index = i;
      }
      
      if(data[0][i].includes("uin") || data[0][i].includes("Uin") || data[0][i].includes("UIN")){
        uin_index = i;
      }
    }
    
    console.log(link_index);
    
    for(var i = 0; i < data.length; i++){
      if(data[i][link_index] == " " || data[i][link_index] == ""){
//        console.log(data[i][first_name_index] + data[i][last_name_index] + data[i][uin_index]);
        alll(data[i][first_name_index], data[i][last_name_index], data[i][uin_index]);
      }
    }

}

function edit_specific_row(input_row, index){
  
  var data = importCSVFromGoogleDrive("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0", 0);
  
  var first_name_index, last_name_index, uin_index;
  
  for(var i = 0; i < data[0].length; i++){
    if(data[0][i].includes("First") || data[0][i].includes("first") || data[0][i].includes("FIRST")){
      first_name_index = i;
    }
      
    if(data[0][i].includes("Last") || data[0][i].includes("last") || data[0][i].includes("LAST")){
      last_name_index = i;
    }
      
    if(data[0][i].includes("uin") || data[0][i].includes("Uin") || data[0][i].includes("UIN")){
      uin_index = i;
    }
  }
  
  
  
  var old_folder_name = data[index][first_name_index] + '_' + data[index][last_name_index] + '_' + data[index][uin_index];
  
  var new_folder_name = input_row[first_name_index] + '_' + input_row[last_name_index] + '_' + input_row[uin_index];
  
  
  var folders = DriveApp.getFolderById("1NB26J5C-iLoyygB17APYlc0PLn9sQGIJ").getFolders();

//  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;

  while (folders.hasNext()) {
    var folder = folders.next();
    if(old_folder_name == folder.getName()) {
//      Logger.log(folder.getUrl());
//      return folder.getUrl();
      folder.setName(new_folder_name)
    }
  }
//  return null;
  
  
      
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GwEl7OViaC6z6P4Msf4mkjCr1Fv1K3NQX7O1rWwO7J0/edit#gid=0").getSheets()[0];
  
  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols - 1; j++){
      ss.getRange(index + 1, j + 1).setValue(input_row[j]);
    }
  }

  Logger.log(ss.getRange(3, 1).getValue())
  
  
  
}


















