#target InDesign;
#include "./functions.jsx";
//Script start here...

//close all opened documents
for (var myCounter = app.documents.length; myCounter > 0; myCounter--) {
    app.documents.item(myCounter - 1).close(SaveOptions.NO);
}
var document = setDocument();
const PAGE_W = Number(document.documentPreferences.pageWidth);
const PAGE_H = Number(document.documentPreferences.pageHeight);
const MARGIN_X1 = 70;
const MARGIN_Y1 = 70;
const MARGIN_X2 = PAGE_W - 70;
const MARGIN_Y2 = 100;
var myMasterSpread = setMasterSpread(document);
setMargin(document, myMasterSpread);
setGrid(document);
var sourceLayer = document.layers[0];
sourceLayer.name = "sourceLayer";
var secondLayer = document.layers.add(sourceLayer);
secondLayer.name = "secondLayer";
setFooter(document, myMasterSpread);
setContent(document);
setFooterImg(document);
//set Cover page
var coverPage = document.pages.add();
coverPage.move(LocationOptions.AT_BEGINNING);
setCoverImg(document);
setParagraphStyle(document);
//remove masterspread for cover
var cover = document.pages.item(0);
cover.appliedMaster = null;
// var myFile = new File(app.activeScript.parent.fsName + '/abc.jsx');
// if (myFile.exists) {
//     app.doScript(myFile, ScriptLanguage.JAVASCRIPT)
// }