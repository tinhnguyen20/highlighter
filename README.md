# Highlighter

A simple google doc add on that highlights all words in a google document.

## Installation

From within your document select the menu item **Tools > Script Editor**

Open highlight.gs inside editor, save the script, and refresh the opened google doc.

To run the script select the menu item **Add-ons > highlighter > Find ing words**

## Parsing a google doc

```gs
function highlightDoc() {

  var regex = /\w+ing/;
  var regexStr = "[A-Za-z]+ing";
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
```

## Improvements to be made
- Deployment the script project as API executable, Permissions not set for UI
- [Enabling](https://developers.google.com/apps-script/api/how-tos/enable) script authorization and access
