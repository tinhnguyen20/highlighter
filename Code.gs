/**
 * @OnlyCurrentDoc
 */

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Find ing words', 'highlightDoc')
      .addItem('search tool', 'showSearchTool')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSearchTool() {
  var ui = HtmlService.createHtmlOutputFromFile('searchbar')
      .setTitle('Search-ing')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
}



function highlightDoc(s) {
  let regexStr;
  if (typeof s !== "undefined") {
    regexStr = "[A-Za-z]+" + s
  } else {
    regexStr = "[A-Za-z]+ing";
  }
  
  var regex = /\w+ing/g;
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  
  // parse for all endings in 'ing'
  
  var searchResult = body.findText(regexStr);
  while (searchResult !== null) {
    var foundText = searchResult.getElement().asText();
    var start = searchResult.getStartOffset();
    var end = searchResult.getEndOffsetInclusive();
    
    // Change the background color to yellow
    foundText.setBackgroundColor(start, end, "#ffee00");
    searchResult = body.findText(regexStr, searchResult);
  }
}


