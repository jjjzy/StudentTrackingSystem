var tracking_sheet = "https://docs.google.com/spreadsheets/d/1DntV71tq3chViETBZbj-jRv-ouQTEMbDW-toU1QSOwk/edit#gid=0";
var folderID = "1GoTJFoeLO80jHuH1Oge2rkFWF5cuvK0k";

function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function importCSVFromGoogleDrive(index) {
  var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[index];

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

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function is_folder_exist(first_name, last_name, uin){
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
//  folder = DriveApp.getFoldersByName(assumed_folder_name);
//  if(folder.hasNext()){
//    return true;
//  }
//  return false;
  var folders = DriveApp.getFolderById(folderID).getFolders();
  while (cfolders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      return true;
    }
  }
  return false;
}

function check_existence(first_name,last_name,uin)
{
  var folder_details = {}
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var exists = false;
  var folders = DriveApp.getFolderById(folderID).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      exists = true;
    }
  }
  folder_details.exist = exists;
  folder_details.name = assumed_folder_name;
  folder_details.uin = uin
  return folder_details;
}

function add_student_and_append_link(data, first_name, last_name, uin){
  var folders = DriveApp.getFolderById(folderID)
  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;
  var newFolder = folders.createFolder(assumed_folder_name);
  
  newFolder.createFolder("Advising Notes");
  newFolder.createFolder("Application");
  newFolder.createFolder("Degree Documents");
  newFolder.createFolder("ISS Documents");
  
  var url = newFolder.getUrl()
  var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[0];
  
  data.push(url);
  
  ss.appendRow(data);
}


function alll(folder_name, uin){
  var folder = DriveApp.getFolderById(folderID);
  var newFolder = folder.createFolder(folder_name);
  
  newFolder.createFolder("Advising Notes");
  newFolder.createFolder("Application");
  newFolder.createFolder("Degree Documents");
  newFolder.createFolder("ISS Documents");

  Logger.log("URL  " + newFolder.getUrl());
  var url = newFolder.getUrl();
  var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[0];

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
      ss.getRange(i + 1, link_index + 1).setValue(url);
    }
  }
  return;
}

function test(){
  var data = importCSVFromGoogleDrive(0);
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
        folder_name = data[i][first_name_index]+"_"+data[i][last_name_index]+"_"+data[i][uin_index]
        alll(folder_name, data[i][uin_index]);
      }
    }

}

function edit_specific_row(input_row, index, page){
  
  var data = importCSVFromGoogleDrive(page);
  
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
  
  
  var folders = DriveApp.getFolderById(folderID).getFolders();

//  var assumed_folder_name = first_name + '_' + last_name + '_' + uin;

  while (folders.hasNext()) {
    var folder = folders.next();
    if(old_folder_name == folder.getName()) {
      folder.setName(new_folder_name)
    }
  }
  var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[page];
  // if (page){
  //   var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[1];
  // }
  // else{
  //   var ss = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[0];
  // }
  var rows = ss.getLastRow();
  var cols = ss.getLastColumn();
  
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols - 1; j++){
      ss.getRange(index + 1, j + 1).setValue(input_row[j]);
    }
  }
}

function archiveStudent(header_item,index){
  var currentstudent = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[0];
  var achievedstudent = SpreadsheetApp.openByUrl(tracking_sheet).getSheets()[1];
  achievedstudent.appendRow(header_item);
  currentstudent.deleteRow(index);
}

function createAdvisingDocument(obj){
  var assumed_folder_name = obj.first_name + '_' +obj.last_name + '_' + obj.uin;
  var exists = false;
  var sFolder = null;
  var folders = DriveApp.getFolderById(folderID).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      exists = true;
      sFolder = folder;
    }
  }
  var docCreated = false;
  if (exists==true){
    temp = sFolder.getFoldersByName("Advising Notes");
    adFolder = temp.next();
    adFolder.createFile(obj.docName+".docx",obj.text);
    docCreated = true;
  }
  return docCreated;
}

function uploadFileToDrive(content,filename,type,obj){
  var assumed_folder_name = obj.first_name + '_' +obj.last_name + '_' + obj.uin;
  var exists = false;
  var sFolder = null;
  var folders = DriveApp.getFolderById(folderID).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if(assumed_folder_name == folder.getName()) {
      exists = true;
      sFolder = folder;
    }
  }
  var docUploaded = false;
  
  if (exists==true){
    temp = sFolder.getFoldersByName("Degree Documents");
    ddFolder = temp.next();
    var new_file_name = type+"_"+obj.docName;
    var contentType = content.substring(5,content.indexOf(';')),
        bytes = Utilities.base64Decode(content.substr(content.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, new_file_name);  
    fl = ddFolder.createFile(blob);
    docUploaded = true;
  }
  return docUploaded;
}












