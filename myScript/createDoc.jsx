#target InDesign;
#include "./functions.jsx";
//Script start here...
var document = setDocument();
var myMasterSpread = setMasterSpread(document);
setMargin(document, myMasterSpread);
const pageW = Number(document.documentPreferences.pageWidth);
const pageH = Number(document.documentPreferences.pageHeight);
var x2 = pageW - 70;
setGrid(document);
var sourceLayer = setLayer(document);
setFooter(document, myMasterSpread, sourceLayer);
setContent(document, sourceLayer);



var myParagraphStyle = document.paragraphStyles.item("Heading 1");
try {
    var myName = myParagraphStyle.name;
} catch (myError) {
    //The paragraph style did not exist, so create it.
    myParagraphStyle = document.paragraphStyles.add({ name: "Heading 1" });
}
//We'll need to create a color. Check to see if the color already exists.
var myColor = document.colors.item("Red");
try {
    myName = myColor.name;
} catch (myError) {
    //The color did not exist, so create it.
    myColor = document.colors.add({ name: "Red", model: ColorModel.PROCESS, colorValue: [0, 100, 100, 0] });
}
//Now set the formatting of the paragraph style.
myParagraphStyle.appliedFont = "Arial";
myParagraphStyle.fontStyle = "Bold";
myParagraphStyle.pointSize = 24;
myParagraphStyle.spaceAfter = 24;
myParagraphStyle.spaceBefore = 24;
myParagraphStyle.fillColor = document.colors.item("Red");
//Apply the style to the paragraph.
var preFile = File('/Applications/MAMP/htdocs/indesignScript/styles/designfreebies_indesign_stylesheet_template.indd');
app.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, preFile, GlobalClashResolutionStrategy.LOAD_ALL_WITH_OVERWRITE);
var style = document.paragraphStyleGroups.itemByName('Paragraphs').paragraphStyles.itemByName("Paragraph - with indent");
// document.pages.item(0).textFrames.item(0).paragraphs.item(0).applyParagraphStyle(style, true);


//You could also use:
//document.pages.item(0).textFrames.item(0).paragraphs.item(0).appliedParagraphStyle = myParagraphStyle;


// //Display a standard open file dialog box to select a text file.
// var myTextFile = File.openDialog("Choose a text file");
// //If a text file was selected, and if you didn't press Cancel,
// //place the text file at the first insertion point after the headline.
// if((myTextFile)&&(myTextFile != null)){
//     myTextFrame.insertionPoints.item(-1).place(myTextFile);
// }


//Display a standard open file dialog box to select a graphic file.
// var myGraphicFile = File.openDialog("Choose a graphic file");
//If a graphic file was selected, and if you didn't press Cancel, 
//place the graphic file on the page.

// var myGraphicFile = File('/Applications/MAMP/htdocs/indesignScript/link/shared.ai'); 
// if((myGraphicFile)&&(myGraphicFile != null)){
//     var myGraphic = document.pages.item(0).place(myGraphicFile, [70, 70], sourceLayer );
// //Since you can place multiple graphics at once, the place method
// //returns an array. To get the graphic you placed, get the first
// myGraphic = myGraphic[0];
// //Create an object style to apply to the graphic frame.
// var myObjectStyle = document.objectStyles.item("GraphicFrame");
// try {
//     var myName = myObjectStyle.name;
// }catch (myError){
// //The object style did not exist, so create it.
// myObjectStyle = document.objectStyles.add({name:"GraphicFrame"});
// }
// myObjectStyle.enableStroke = true;
// myObjectStyle.strokeWeight = 3;
// myObjectStyle.strokeType = document.strokeStyles.itemByID(0);
// myObjectStyle.strokeColor = document.colors.item("Red");
// //The frame containing the graphic is the parent of the graphic.
// var myFrame = myGraphic.parent;
// myFrame.applyObjectStyle(myObjectStyle, true);
// //Resize the frame to a specific size.
// myFrame.geometricBounds = [0,0,144,144];
// //Fit the graphic to the frame proportionally.
// myFrame.fit(FitOptions.PROPORTIONALLY);
// //Next, fit frame to the resized graphic.
// myFrame.fit(FitOptions.FRAME_TO_CONTENT);
// var myBounds = myFrame.geometricBounds;
// var myGraphicWidth = myBounds[3]-myBounds[1];
// //Move the graphic frame.
// var myTopMargin = document.pages.item(0).marginPreferences.top;
// myFrame.move([pageW-myGraphicWidth, myTopMargin]);
// //Apply a text wrap to the graphic frame.
// myFrame.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
// myFrame.textWrapPreferences.textWrapOffset = [24, 12, 24, 12];
// }

//remove masterspread for cover
var cover = document.pages.item(0);
cover.appliedMaster = null;

var leftFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_left.eps');
var rightFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_right.eps');
var coverImg = File('/Applications/MAMP/htdocs/indesignScript/link/cover.eps');
if ((leftFooterImg) && (rightFooterImg) && (leftFooterImg != null) && (rightFooterImg != null)) {
    //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
    var imgLeft = myMasterSpread.myLeftPage.place(leftFooterImg, [0, 0], sourceLayer);
    var imgRight = myMasterSpread.myRightPage.place(rightFooterImg, [0, 0], sourceLayer);
    //Since you can place multiple graphics at once, the place method
    //returns an array. To get the graphic you placed, get the first
    imgLeft = imgLeft[0];
    imgRight = imgRight[0];
    //The frame containing the graphic is the parent of the graphic.
    var leftFrame = imgLeft.parent;
    var rightFrame = imgRight.parent;
    //Resize the frame to a specific size.
    leftFrame.geometricBounds = [748.727, 0, pageH, pageW];
    rightFrame.geometricBounds = [748.727, 0, pageH, pageW];
    //Fit the graphic to the frame proportionally.
    leftFrame.fit(FitOptions.PROPORTIONALLY);
    rightFrame.fit(FitOptions.PROPORTIONALLY);
    //Next, fit frame to the resized graphic.
    leftFrame.fit(FitOptions.FRAME_TO_CONTENT);
    rightFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

    // if((coverImg)&&(coverImg != null)){
    // //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
    // var coverPage = document.pages.item(0);
    // var cover = coverPage.place(coverImg, [0, 0], sourceLayer );
    // //Since you can place multiple graphics at once, the place method
    // //returns an array. To get the graphic you placed, get the first
    // cover = cover[0];
    //  //The frame containing the graphic is the parent of the graphic.
    // var coverFrame = cover.parent;
    // //Resize the frame to a specific size.
    // coverFrame.geometricBounds = [0,0,pageH,pageW];
    // //Fit the graphic to the frame proportionally.
    // coverFrame.fit(FitOptions.PROPORTIONALLY);
    // //Next, fit frame to the resized graphic.
    // coverFrame.fit(FitOptions.FRAME_TO_CONTENT);
    // }






