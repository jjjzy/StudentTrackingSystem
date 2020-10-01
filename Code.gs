function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function userClicked(){
  Logger.log("someone clicked the button");
}